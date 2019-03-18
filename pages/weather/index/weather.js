const weatherUtil = require('../../../utils/weatherUtil.js');
const imageUtil = require('../../../utils/imageUtil.js');
const util = require('../../../utils/util.js');
var app = getApp();

function refreshData(that) {
  weatherUtil.loadWeatherData((success, data) => {
    for(var i=0;i<data.daily.length;i++) {
      if (i == 0) {
        data.daily[i].date = "今天";
      } else if (i == 1) {
        data.daily[i].date = "明天";
      } else {
        data.daily[i].date = data.daily[i].date.substring(5, 10);
      }
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

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    title: 'MOJI天气',
    weather: {},
    backgroudUrl:'',
    qltyMap: {
      '优': 'bg-green',
      '良': 'bg-yellow',
      '轻度污染': 'bg-orange',
      '中度污染': 'bg-red',
      '重度污染': 'bg-mauve',
      '严重污染': 'bg-purple',
    },
    contMap: {
      '100': 'https://cdn.heweather.com/cond_icon/100.png',
      '101': 'https://cdn.heweather.com/cond_icon/101.png',
      '102': 'https://cdn.heweather.com/cond_icon/102.png',
      '103': 'https://cdn.heweather.com/cond_icon/103.png',
      '104': 'https://cdn.heweather.com/cond_icon/104.png',
      '200': 'https://cdn.heweather.com/cond_icon/200.png',
      '201': 'https://cdn.heweather.com/cond_icon/201.png',
      '202': 'https://cdn.heweather.com/cond_icon/202.png',
      '203': 'https://cdn.heweather.com/cond_icon/203.png',
      '204': 'https://cdn.heweather.com/cond_icon/204.png',
      '205': 'https://cdn.heweather.com/cond_icon/205.png',
      '206': 'https://cdn.heweather.com/cond_icon/206.png',
      '207': 'https://cdn.heweather.com/cond_icon/207.png',
      '208': 'https://cdn.heweather.com/cond_icon/208.png',
      '209': 'https://cdn.heweather.com/cond_icon/209.png',
      '210': 'https://cdn.heweather.com/cond_icon/210.png',
      '211': 'https://cdn.heweather.com/cond_icon/211.png',
      '212': 'https://cdn.heweather.com/cond_icon/212.png',
      '213': 'https://cdn.heweather.com/cond_icon/213.png',
      '300': 'https://cdn.heweather.com/cond_icon/300.png',
      '301': 'https://cdn.heweather.com/cond_icon/301.png',
      '302': 'https://cdn.heweather.com/cond_icon/302.png',
      '303': 'https://cdn.heweather.com/cond_icon/303.png',
      '304': 'https://cdn.heweather.com/cond_icon/304.png',
      '305': 'https://cdn.heweather.com/cond_icon/305.png',
      '306': 'https://cdn.heweather.com/cond_icon/306.png',
      '307': 'https://cdn.heweather.com/cond_icon/307.png',
      '308': 'https://cdn.heweather.com/cond_icon/308.png',
      '309': 'https://cdn.heweather.com/cond_icon/309.png',
      '310': 'https://cdn.heweather.com/cond_icon/310.png',
      '311': 'https://cdn.heweather.com/cond_icon/311.png',
      '312': 'https://cdn.heweather.com/cond_icon/312.png',
      '313': 'https://cdn.heweather.com/cond_icon/313.png',
      '314': 'https://cdn.heweather.com/cond_icon/314.png',
      '315': 'https://cdn.heweather.com/cond_icon/315.png',
      '316': 'https://cdn.heweather.com/cond_icon/316.png',
      '317': 'https://cdn.heweather.com/cond_icon/317.png',
      '318': 'https://cdn.heweather.com/cond_icon/318.png',
      '399': 'https://cdn.heweather.com/cond_icon/399.png',
      '400': 'https://cdn.heweather.com/cond_icon/400.png',
      '401': 'https://cdn.heweather.com/cond_icon/401.png',
      '402': 'https://cdn.heweather.com/cond_icon/402.png',
      '403': 'https://cdn.heweather.com/cond_icon/403.png',
      '404': 'https://cdn.heweather.com/cond_icon/404.png',
      '405': 'https://cdn.heweather.com/cond_icon/405.png',
      '406': 'https://cdn.heweather.com/cond_icon/406.png',
      '407': 'https://cdn.heweather.com/cond_icon/407.png',
      '408': 'https://cdn.heweather.com/cond_icon/408.png',
      '409': 'https://cdn.heweather.com/cond_icon/409.png',
      '410': 'https://cdn.heweather.com/cond_icon/410.png',
      '499': 'https://cdn.heweather.com/cond_icon/499.png',
      '500': 'https://cdn.heweather.com/cond_icon/500.png',
      '501': 'https://cdn.heweather.com/cond_icon/501.png',
      '502': 'https://cdn.heweather.com/cond_icon/502.png',
      '503': 'https://cdn.heweather.com/cond_icon/503.png',
      '504': 'https://cdn.heweather.com/cond_icon/504.png',
      '505': 'https://cdn.heweather.com/cond_icon/505.png',
      '506': 'https://cdn.heweather.com/cond_icon/506.png',
      '507': 'https://cdn.heweather.com/cond_icon/507.png',
      '508': 'https://cdn.heweather.com/cond_icon/508.png',
      '509': 'https://cdn.heweather.com/cond_icon/509.png',
      '510': 'https://cdn.heweather.com/cond_icon/510.png',
      '511': 'https://cdn.heweather.com/cond_icon/511.png',
      '512': 'https://cdn.heweather.com/cond_icon/512.png',
      '513': 'https://cdn.heweather.com/cond_icon/513.png',
      '514': 'https://cdn.heweather.com/cond_icon/514.png',
      '515': 'https://cdn.heweather.com/cond_icon/515.png'
    }
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
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      content: e.currentTarget.dataset.content
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      content: ''
    })
  }
})