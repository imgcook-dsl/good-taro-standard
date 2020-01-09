'use strict';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { fetch } from 'whatwg-fetch';
import jsonp from 'fetch-jsonp';
import './index.less';
const print = function(value) {
  console.log(value);
};
class Index extends Component {
  state = {
    data: [
      {
        title: '小户型卫浴怎样才能装得高大上？',
        coverImage: 'https://img.alicdn.com/tfs/TB1Txq6o7T2gK0jSZFkXXcIQFXa-684-684.png',
        readCount: 200,
        user: { userImage: 'https://img.alicdn.com/tfs/TB1DWe6oYj1gK0jSZFOXXc7GpXa-60-60.png', userName: '时尚家居' },
        url: 'https://www.imgcook.com'
      },
      {
        title: '拥有超多功能的40平米简约小公寓了解一下',
        coverImage: 'https://img.alicdn.com/tfs/TB1XRQTo7P2gK0jSZPxXXacQpXa-684-648.png',
        readCount: 500,
        user: {
          userImage: 'https://img.alicdn.com/tfs/TB1DWe6oYj1gK0jSZFOXXc7GpXa-60-60.png',
          userName: '花花设计工作'
        },
        url: 'https://www.imgcook.com/docs'
      }
    ]
  };
  constructor(props, context) {
    super();
    console.log('super props');
    this.fetch_example();
    this.jsonp_example();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  isReadCountShow(readCount) {
    return readCount > 300;
  }
  fetch_example() {
    fetch('https://jsonplaceholder.typicode.com/todos/1', { method: 'GET', headers: '{"Content-Type":"json"}' })
      .then(response => response.json())
      .then((data, error) => {
        console.log('fetch example: ', data, error);
        return data;
      })
      .catch(e => {
        console.log('error', e);
      });
  }
  jsonp_example() {
    jsonp('https://assets.airbnb.com/frontend/search_results.js', { jsonpCallbackFunction: 'search_results', body: {} })
      .then(response => response.json())
      .then((data, error) => {
        console.log('jsonp example: ', data, error);
        return data;
      })
      .catch(e => {
        console.log('error', e);
      });
  }
  render() {
    return (
      <View className="box">
        {this.state.data.map((item, index) => {
          return (
            <View
              key={index}
              onClick={e => {
                window.open(item.url, '_blank');
              }}
              data-url={item.url}
              key={item.index}
            >
              <View className="bd">
                <Image
                  className="layer"
                  src={require('https://img.alicdn.com/tfs/TB1bLoWoYH1gK0jSZFwXXc7aXXa-684-684.png')}
                />
                <Image className="bg" src={require(item.coverImage)} />
                <View className="wrap">
                  <Image
                    className="riverdinwei"
                    src={require('https://img.alicdn.com/tfs/TB1mtZRoVT7gK0jSZFpXXaTkpXa-28-36.png')}
                  />
                  <Text className="distance">距离500m</Text>
                </View>
              </View>
              <View className="main">
                <Text className="title">{item.title}</Text>
              </View>
              <View className="ft">
                <View className="block">
                  <Image
                    className="xianjin"
                    src={require('https://img.alicdn.com/tfs/TB1OvsYoW61gK0jSZFlXXXDKFXa-60-60.png')}
                  />
                  <Text className="fashionHome">{item.user.userName}</Text>
                </View>
                {this.isReadCountShow(item.readCount) && (
                  <View className="group">
                    <Image
                      className="favorite"
                      src={require('https://img.alicdn.com/tfs/TB1arwYo7T2gK0jSZFkXXcIQFXa-46-44.png')}
                    />
                    <Text className="num">{item.readCount}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
export default Index;
