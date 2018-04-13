const weatherUtil = require('../../../utils/weatherUtil.js');
const imageUtil = require('../../../utils/imageUtil.js');
const util = require('../../../utils/util.js');
var app = getApp();

function refreshData(that) {
  weatherUtil.loadWeatherData((success, data) => {
    for(var i=0;i<data.daily.length;i++) {
      data.daily[i].date = data.daily[i].date.substring(5,10);
    };
    that.setData({
      weather: data
    });
    wx.showToast({
      title:'已获取最新天气信息！'
    })
    wx.stopPullDownRefresh();
  });
}

function subDate(value) {
  return value.substring(5, 9);
}

Page({
  data: {
    title: 'MOJI天气',
    weather: {},
    backgroudUrl:''
  },

  bindViewTap: function () {

  },
  onShareAppMessage: function () {

  },
  onLoad: function () {
    var that=this;
    // imageUtil.requestDailyImageUrl((url)=>{
    //     that.setData({
    //       backgroudUrl:url
    //     });
    // });
    refreshData(that);
  },

  onPullDownRefresh: function () {
    console.log("下拉刷新了");
    refreshData(this);
  }
})