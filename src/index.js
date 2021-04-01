
const nameMapping = {
  'page': 'View',
  'text': 'Text',
  'div': 'View',
  'image': 'Image',
  'block': 'View'
}

module.exports = function (schema, option) {
  const { prettier } = option;

  // imports
  const imports = [];

  // inline style
  const style = {};

  // Global Public Functions
  const utils = [];

  // Classes 
  const classes = [];

  // import 组件名称列表
  const componentNames = {};

  const isExpression = (value) => {
    return /^\{\{.*\}\}$/.test(value);
  }

  const toString = (value) => {
    if ({}.toString.call(value) === '[object Function]') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        } else {
          return value;
        }
      })
    }

    return String(value);
  };

  // convert to responsive unit, such as vw
  const parseStyle = (style, type) => {
    const parsedStyles = [];
    const exceptRnStyles = [];

    for (let key in style) {
      const name = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLocaleLowerCase();
      const value = style[key];

      if (type === 'text' && (key === 'width' || key === 'height')) {
        continue;
      }

      switch (key) {
        case 'whiteSpace':
        case 'boxSizing':
        case 'backgroundImage':
        case 'borderBottomStyle':
        case 'textOverflow':
        case 'visibility':
        case 'filter':
          exceptRnStyles.push(`${name}: ${value}`);
          break;
        default:
          parsedStyles.push(`${name}: ${value}`);
      }
    }

    if (exceptRnStyles.length > 0) {
      exceptRnStyles.unshift('\n/*  #ifndef rn */\n');
      exceptRnStyles.push('\n/*  #endif */\n');
    }
    return parsedStyles.concat(exceptRnStyles);
  }

  // parse function, return params and content
  const parseFunction = (func) => {
    const funcString = func.toString();
    const params = funcString.match(/\([^\(\)]*\)/)[0].slice(1, -1);
    const content = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
    return {
      params,
      content
    };
  }

  // parse layer props(static values or expression)
  const parseProps = (value, isReactNode) => {
    if (typeof value === 'string') {
      if (isExpression(value)) {
        if (isReactNode) {
          return value.slice(1, -1);
        } else {
          return value.slice(2, -2);
        }
      }

      if (isReactNode) {
        return value;
      } else {
        return `'${value}'`;
      }
    } else if (typeof value === 'function') {
      const { params, content } = parseFunction(value);
      return `(${params}) => {${content}}`;
    }
  }

  // parse async dataSource
  const parseDataSource = (data) => {
    const name = data.id;
    const { uri, method, params } = data.options;
    const action = data.type;
    let payload = {};

    switch (action) {
      case 'fetch':
        if (imports.indexOf(`import {fetch} from whatwg-fetch`) === -1) {
          imports.push(`import {fetch} from 'whatwg-fetch'`);
        }
        payload = {
          method: method
        };

        break;
      case 'jsonp':
        if (imports.indexOf(`import {fetchJsonp} from fetch-jsonp`) === -1) {
          imports.push(`import jsonp from 'fetch-jsonp'`);
        }
        break;
    }

    Object.keys(data.options).forEach((key) => {
      if (['uri', 'method', 'params'].indexOf(key) === -1) {
        payload[key] = toString(data.options[key]);
      }
    });

    // params parse should in string template
    if (params) {
      payload = `${toString(payload).slice(0, -1)} ,body: ${isExpression(params) ? parseProps(params) : toString(params)}}`;
    } else {
      payload = toString(payload);
    }

    let result = `{
      ${action}(${parseProps(uri)}, ${toString(payload)})
        .then((response) => response.json())
    `;

    if (data.dataHandler) {
      const { params, content } = parseFunction(data.dataHandler);
      result += `.then((${params}) => {${content}})
        .catch((e) => {
          console.log('error', e);
        })
      `
    }

    result += '}';

    return `${name}() ${result}`;
  }

  // parse condition: whether render the layer
  const parseCondition = (condition, render) => {
    if (typeof condition === 'boolean') {
      return `${condition} && ${render}`
    } else if (typeof condition === 'string') {
      return `${condition.slice(2, -2)} && ${render}`
    }
  }

  // parse loop render
  const parseLoop = (loop, loopArg, render) => {
    let data;
    let loopArgItem = (loopArg && loopArg[0]) || 'item';
    let loopArgIndex = (loopArg && loopArg[1]) || 'index';

    if (Array.isArray(loop)) {
      data = toString(loop);
    } else if (isExpression(loop)) {
      data = loop.slice(2, -2);
    }

    // add loop key
    const tagEnd = render.match(/^<.+?\s/)[0].length;
    render = `${render.slice(0, tagEnd)} key={${loopArgIndex}}${render.slice(tagEnd)}`;

    // remove `this` 
    const re = new RegExp(`this.${loopArgItem}`, 'g')
    render = render.replace(re, loopArgItem);

    return `${data}.map((${loopArgItem}, ${loopArgIndex}) => {
      return (${render});
    })`;
  }

  // generate render xml
  const generateRender = (schema) => {
    const type = schema.componentName.toLowerCase();
    const className = schema.props && schema.props.className;
    const classString = className ? ` className='${className}'` : '';

    if (className) {
      style[className] = parseStyle(schema.props.style, type);
    }

    componentNames[nameMapping[type]] = true;

    let xml;
    let props = '';

    Object.keys(schema.props).forEach((key) => {
      if (['className', 'style', 'text', 'src'].indexOf(key) === -1) {
        props += ` ${key}={${parseProps(schema.props[key])}}`;
      }
    })
    let isContainer = false;
    if (schema.componentName === 'Page' || schema.componentName === 'Block') {
      isContainer = true;
    }
    
    // 设置标签类型
    switch (type) {
      case 'text':
        const innerText = parseProps(schema.props.text, true);
        xml = `<${nameMapping[type]}${classString}${props}>${innerText}</${nameMapping[type]}>`;
        break;
      case 'image':
        const source = parseProps(schema.props.src);
        xml = `<${nameMapping[type]}${classString}${props} src={require(${source})} />`;
        break;
      case 'div':
      case 'page':
      case 'block':
        if (schema.children && schema.children.length) {
          xml = `<${nameMapping[type]}${classString}${props}>${transform(schema.children)}</${nameMapping[type]}>`;
        } else {
          xml = `<${nameMapping[type]}${classString}${props} />`;
        }
        break;
    }

    if (schema.loop) {
      xml = parseLoop(schema.loop, schema.loopArgs, xml)
    }
    if (schema.condition && !isContainer) {
      xml = parseCondition(schema.condition, xml);
    }
    if (schema.loop || (schema.condition && !isContainer)) {
      xml = `{${xml}}`;
    }

    return xml;
  }

  // parse schema
  const transform = (schema) => {
    let result = '';

    if (Array.isArray(schema)) {
      schema.forEach((layer) => {
        result += transform(layer);
      });
    } else {
      const type = schema.componentName.toLowerCase();

      if (['page', 'block'].indexOf(type) !== -1) {
        // 容器组件处理: state/method/dataSource/lifeCycle/render
        const states = [];
        const lifeCycles = [];
        const methods = [];
        const init = [];
        const render = [`render(){ return (`];
        let classData = [`class Index extends Component {`];

        if (schema.state) {
          states.push(`state = ${toString(schema.state)}`);
        }

        if (schema.methods) {
          Object.keys(schema.methods).forEach((name) => {
            const { params, content } = parseFunction(schema.methods[name]);
            methods.push(`${name}(${params}) {${content}}`);
          });
        }

        if (schema.dataSource && Array.isArray(schema.dataSource.list)) {
          schema.dataSource.list.forEach((item) => {
            if (typeof item.isInit === 'boolean' && item.isInit) {
              init.push(`this.${item.id}();`)
            } else if (typeof item.isInit === 'string') {
              init.push(`if (${parseProps(item.isInit)}) { this.${item.id}(); }`)
            }
            methods.push(parseDataSource(item));
          });

          if (schema.dataSource.dataHandler) {
            const { params, content } = parseFunction(schema.dataSource.dataHandler);
            methods.push(`dataHandler(${params}) {${content}}`);
            init.push(`this.dataHandler()`);
          }
        }

        if (schema.lifeCycles) {
          if (!schema.lifeCycles['_constructor']) {
            lifeCycles.push(`constructor(props, context) { super(); ${init.join('\n')}}`);
          }

          Object.keys(schema.lifeCycles).forEach((name) => {
            const { params, content } = parseFunction(schema.lifeCycles[name]);

            if (name === '_constructor') {
              lifeCycles.push(`constructor(${params}) { super(); ${content} ${init.join('\n')}}`);
            } else {
              lifeCycles.push(`${name}(${params}) {${content}}`);
            }
          });
        }

        render.push(generateRender(schema))
        render.push(`);}`);

        classData = classData.concat(states).concat(lifeCycles).concat(methods).concat(render);
        classData.push('}');

        classes.push(classData.join('\n'));
      } else {
        result += generateRender(schema);
      }
    }
    return result;
  };

  if (option.utils) {
    Object.keys(option.utils).forEach((name) => {
      utils.push(`const ${name} = ${option.utils[name]}`);
    });
  }

  // start parse schema
  transform(schema);


  // 输出外部类样式
  function printOuterStyle(style) {
    let result = '';
    for (let key in style) {
      result += `.${key} {
         ${style[key].join(';')} 
        } \n`
    }
    return result;
  }

  return {
    panelDisplay: [
      {
        panelName: `index.jsx`,
        panelValue: prettier.format(`
          'use strict';
          import Taro, { Component } from '@tarojs/taro';
          import { ${Object.keys(componentNames).join(', ')} } from '@tarojs/components';
          ${imports.join('\n')}
          import './index.less';
          ${utils.join('\n')}
          ${classes.join('\n')}
          export default Index;
        `, {
          parser: 'babel',
          printWidth: 120,
          singleQuote: true
        }),
        panelType: 'js',
      },
      {
        panelName: `index.less`,
        panelValue: prettier.format(`${printOuterStyle(style)}`, {
          parser: 'less',
          printWidth: 120,
        }),
        panelType: 'less'
      }
    ],
    noTemplate: true
  };
}
