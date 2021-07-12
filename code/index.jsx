'use strict';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.less';
const print = function(value) {
  console.log(value);
};
class Index extends Component {
  render() {
    return (
      <View className="page">
        <View className="tabbar">
          <View className="body">
            <Image
              className="picture"
              src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9b2fe630e08211ebad5e99d6a5b1577c.png"
            />
            <View className="group">
              <Text className="title">昵称</Text>
              <View className="view">
                <Image
                  className="icon"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9b7ec980e08211ebbbf9b111e479b39a.png"
                />
                <Text className="caption">还未签到，去签到</Text>
              </View>
            </View>
            <Image
              className="icon-right"
              src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9b571d40e08211eb859b550173450e84.png"
            />
          </View>
          <View className="footer">
            <View className="group-1">
              <View className="view-1">
                <Text className="num">9098</Text>
                <Text className="title-1">铁豆</Text>
              </View>
              <View className="vertical-line" />
            </View>
            <View className="group-2">
              <View className="view-2">
                <Text className="num-1">1</Text>
                <Text className="tag">张</Text>
              </View>
              <Text className="caption-1">优惠券</Text>
            </View>
          </View>
        </View>
        <View className="list-1v2">
          <View className="wrapper">
            <View className="primary">
              <View className="group-6">
                <Image
                  className="icon-house"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9e42f290e08211ebb14a75ac9773f93f.png"
                />
                <Text className="caption-6">金卡</Text>
              </View>
              <Text className="label">剩余天数 300天</Text>
            </View>
            <View className="side">
              <Text className="button">查看券码</Text>
            </View>
          </View>
          <View className="header">
            <View className="horizontal-line" />
            <View className="horizontal-line-1" />
          </View>
          <View className="submain">
            <Text className="title-2">我的订单</Text>
            <View className="group-3">
              <View className="view-i0">
                <Image
                  className="large-icon"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9ceab590e08211ebad5e99d6a5b1577c.png"
                />
                <Text className="buy">全球购</Text>
              </View>
              {true && (
                <View className="view-i1">
                  <Image
                    className="large-icon-1"
                    src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9d0b0ed0e08211eb859b550173450e84.png"
                  />
                  <Text className="caption-2">VIP服务</Text>
                </View>
              )}
              {true && (
                <View className="view-i2">
                  <Image
                    className="large-icon-2"
                    src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9d27e5a0e08211ebb2c231a0e88ef3b9.png"
                  />
                  <Text className="title-3">旅游</Text>
                </View>
              )}
            </View>
          </View>
          <View className="main">
            <Text className="caption-3">常用功能</Text>
            <View className="group-4">
              <View className="view-i0-1">
                <Image
                  className="image"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9c0cd8b0e08211ebb73f8b8e6554a50b.png"
                />
                <Text className="comment">我的评论</Text>
              </View>
              <View className="view-i1-1">
                <Image
                  className="figure"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9c312990e08211ebbee3fb129ee13a03.png"
                />
                <Text className="title-4">浏览记录</Text>
              </View>
              <View className="view-i2-1">
                <Image
                  className="bitmap"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9c572820e08211eb91dbbf0329356288.png"
                />
                <Text className="caption-4">任务中心</Text>
              </View>
              <View className="view-i3">
                <Image
                  className="picture-1"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9c7c8a70e08211eb865c2377774e47b6.png"
                />
                <Text className="title-5">常见问题</Text>
              </View>
            </View>
            <View className="group-5">
              <View className="view-i0-2">
                <Image
                  className="image-1"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9c9ff0f0e08211eba446af636678619d.png"
                />
                <Text className="caption-5">意见反馈</Text>
              </View>
              <View className="view-i1-2">
                <Image
                  className="figure-1"
                  src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9cc4b700e08211ebbe47a1f72e45b5be.png"
                />
                <Text className="title-6">关于我们</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
