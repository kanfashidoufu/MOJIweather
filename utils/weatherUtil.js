const baseUrl = 'https://free-api.heweather.com/v5/weather?key=19713447578c4afe8c12a351d46ea922';
const baseUrlNew = 'https://free-api.heweather.com/s6/weather?key=f7cb07c2c574454b86280fc7931de6c5';
const aqiUrl = 'https://free-api.heweather.com/s6/air?key=f7cb07c2c574454b86280fc7931de6c5';
const app = getApp();

/**
 * 根据经纬度获取天气
 */
function requestWeatherByLocation(latitude, longitude, callback) {
    wx.request({
      url: aqiUrl + '&location=auto_ip',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res1) {
            // success
            //成功回调后调获取城市信息接口
            wx.request({
              url: baseUrlNew + '&location=' + longitude + ',' + latitude,
              data: {},
              // header: {},
              method: 'GET',
              success: function(res2) {
                var result = pareseWeahterData(res1, res2);
                callback(true, result);
              },
              fail: function(res2) {
                wx.showToast({
                  title: '获取天气失败！'
                });
                callback(false);
              }
            })
        },
        fail: function (res1) {
            // fail
            wx.showToast({
              title: '获取天气失败！'
            });
            callback(false);
        }
    });
}

/**
 * 获取天气回调
 */
function requestWeatherData(callback) {
    requestLocation((success, latitude, longitude) => {
        if (success == false) {
            latitude = 120.13026;
            longitude = 30.25961;
        }
        requestWeatherByLocation(latitude, longitude, callback);
    });
}

/**
 * 解析数据
 */
function pareseWeahterData(orign, after) {
    var weather = {};
    console.log(orign);
    console.log(after);
    var data = orign.data.HeWeather6[0];
    var citydata = after.data.HeWeather6[0];
    // var aqidata = aqi.data.HeWeather6[0];
    weather.city = citydata.basic;
    weather.now = citydata.now;
    weather.daily = citydata.daily_forecast;
    weather.suggestion = citydata.lifestyle;
    // weather.basic = citydata.basic;
    weather.update = citydata.update.loc.substring(10, 16);
    weather.aqi = data.air_now_city;
    console.log(weather);
    return weather;
}

/**
 * 获取位置信息，返回经纬度
 */
function requestLocation(callback) {
    wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
            callback(true, res.latitude, res.longitude);
        },
        fail: function (res) {
            callback(false);
        }
    });
}

function loadWeatherData(callback) {
    requestWeatherData(callback);
}

module.exports = { loadWeatherData: loadWeatherData }