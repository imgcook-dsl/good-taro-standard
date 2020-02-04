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
      <View className="box">
        <View className="hd">
          <Image
            className="layer"
            src={require('https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/91d46030470311eabd7ec1fa8ec28140.png')}
          />
          <View className="block">
            <View className="group">
              <View className="colorDiv" />
            </View>
            <View className="color" />
            <View className="colorDiv_2" />
            <View className="color_2" />
            <View className="colorDiv_3" />
          </View>
          <View className="block_3">
            <View className="block_2">
              <Text className="word">民宿公寓</Text>
            </View>
          </View>
          <View className="block_4">
            <Text className="shopTitle">酒店</Text>
            <View className="color_3" />
          </View>
        </View>
        <View className="main">
          <View className="block_9">
            <View className="group_2">
              <View className="container">
                <Text className="txt">杭州</Text>
                <View className="outer">
                  <View className="colorDiv_4" />
                  <View className="color_4" />
                </View>
              </View>
              <View className="block_5">
                <View className="colorDiv_5" />
              </View>
            </View>
            <View className="block_8">
              <View className="group_3">
                <Text className="word_2">今日入住</Text>
                <Text className="text">明日离店</Text>
              </View>
              <View className="container_2">
                <View className="block_6">
                  <Text className="time">11月25日</Text>
                  <Text className="timeNext">周一</Text>
                  <View className="tagWrap">
                    <Text className="tag">共1晚</Text>
                  </View>
                </View>
                <View className="group_4">
                  <Text className="timer">11月26日</Text>
                  <Text className="timerNext">周二</Text>
                </View>
              </View>
              <View className="block_7">
                <View className="color_5" />
              </View>
            </View>
            <View className="group_6">
              <View className="group_5">
                <Text className="txt_2">江陵路</Text>
                <View className="container_3">
                  <View className="colorDiv_6" />
                </View>
              </View>
              <View className="container_4">
                <View className="colorDiv_7" />
              </View>
            </View>
            <View className="priceOuter">
              <View className="priceWrap">
                <Text className="price">¥300-450，舒适/三星，高档/三…</Text>
                <View className="outer_2">
                  <View className="color_6" />
                </View>
              </View>
              <View className="group_7">
                <View className="color_7" />
              </View>
            </View>
            <View className="shopTitleWrap">
              <Text className="shopTitle_2">查找酒店</Text>
            </View>
          </View>
        </View>
        <View className="submain">
          <View className="block_10">
            <View className="colorDiv_8" />
            <Text className="txt_3">钟点房</Text>
          </View>
          <View className="block_11">
            <View className="color_8" />
            <Text className="shopTitle_3">铁路酒店</Text>
          </View>
          <View className="block_12">
            <View className="colorDiv_9" />
            <Text className="shopTitle_4">特价酒店</Text>
          </View>
        </View>
        <Text className="row">附近酒店</Text>
        <View className="row1">
          <Image
            className="itemLong"
            src={require('https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/94877240470311ea857481b7fe145c48.png')}
          />
          <View className="block_13">
            <View className="shopTitleWrap_2">
              <Text className="shopTitle_5">诺曼岛主题酒店（星光大道江陵路地铁口店）</Text>
              <Text className="word_3">高档型</Text>
            </View>
            <View className="group_8">
              <Text className="count">4.9</Text>
              <Text className="txt_4">分</Text>
            </View>
            <Text className="title">距您直线1.3公里</Text>
            <View className="grid">
              <View className="col1">
                <Text className="tag_2">购物便捷</Text>
              </View>
              <View className="col2">
                <Text className="tag_3">培训学习</Text>
              </View>
              <View className="col3">
                <Text className="tag_4">离医院近</Text>
              </View>
              <View className="col4">
                <Text className="tag_5">古香古色</Text>
              </View>
            </View>
            <View className="priceWrap_2">
              <Text className="yuan">￥</Text>
              <Text className="price_2">288</Text>
              <Text className="txt_5">起</Text>
            </View>
          </View>
        </View>
        <View className="row2">
          <Image
            className="productLong"
            src={require('https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9a971cd0470311eab5896d6b6f989c88.png')}
          />
          <View className="block_15">
            <View className="block_14">
              <Text className="shopTitle_6">诺曼岛主题酒店</Text>
              <Text className="text_2">高档型</Text>
            </View>
            <View className="group_9">
              <Text className="num">4.9</Text>
              <Text className="word_4">分</Text>
            </View>
            <Text className="title_2">距您直线1.3公里</Text>
            <View className="grid_2">
              <View className="col1_2">
                <Text className="tag_6">蜜月出行</Text>
              </View>
              <View className="col2_2">
                <Text className="tag_7">园林庭院</Text>
              </View>
              <View className="col3_2">
                <Text className="tag_8">周边美景</Text>
              </View>
              <View className="col4_2">
                <Text className="tag_9">安静优雅</Text>
              </View>
            </View>
            <View className="moneyWrap">
              <Text className="yuan_2">￥</Text>
              <Text className="money">288</Text>
              <Text className="word_5">起</Text>
            </View>
          </View>
        </View>
        <View className="row3">
          <Image
            className="itemLong_2"
            src={require('https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/967622e0470311eaa7ebf7bd350c0c46.png')}
          />
          <View className="block_16">
            <View className="shopTitleWrap_3">
              <Text className="shopTitle_7">诺曼岛主题酒店（星光大道江陵路地铁口店）</Text>
              <Text className="txt_6">高档型</Text>
            </View>
            <View className="group_10">
              <Text className="count_2">4.9</Text>
              <Text className="text_3">分</Text>
            </View>
            <Text className="title_3">距您直线1.3公里</Text>
            <View className="grid_3">
              <View className="col1_3">
                <Text className="tag_10">商旅之家</Text>
              </View>
              <View className="col2_3">
                <Text className="tag_11">交通便利</Text>
              </View>
              <View className="col3_3">
                <Text className="tag_12">特色建筑</Text>
              </View>
              <View className="col4_3">
                <Text className="tag_13">休闲情调</Text>
              </View>
            </View>
            <View className="priceWrap_3">
              <Text className="yuan_3">￥</Text>
              <Text className="price_3">288</Text>
              <Text className="text_4">起</Text>
            </View>
          </View>
        </View>
        <View className="ft">
          <Image
            className="productLong_2"
            src={require('https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/98582950470311eaa40befe213bb33d1.png')}
          />
          <View className="block_17">
            <View className="shopTitleWrap_4">
              <Text className="shopTitle_8">诺曼岛主题酒店（星光大道江陵路地铁口店）</Text>
              <Text className="word_6">高档型</Text>
            </View>
            <View className="group_11">
              <Text className="num_2">4.9</Text>
              <Text className="txt_7">分</Text>
            </View>
            <Text className="title_4">距您直线1.3公里</Text>
            <View className="grid_4">
              <View className="col1_4">
                <Text className="tag_14">观景露台</Text>
              </View>
              <View className="col2_4">
                <Text className="tag_15">蜜月出行</Text>
              </View>
              <View className="col3_4">
                <Text className="tag_16">文艺范儿</Text>
              </View>
              <View className="col4_4">
                <Text className="tag_17">家有萌宠</Text>
              </View>
            </View>
            <View className="moneyWrap_2">
              <Text className="money_2">￥</Text>
              <Text className="text_5">起</Text>
            </View>
          </View>
          <Text className="num_3">288</Text>
          <View className="block_21">
            <View className="color_9" />
            <View className="block_20">
              <View className="block_19">
                <View className="block_18">
                  <Image
                    className="verticalLine"
                    src={require('https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/9ae8bf40470311ea8463a1554a8aa17b.png')}
                  />
                </View>
              </View>
              <View className="color_10" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
