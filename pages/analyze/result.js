// result.js
//获取应用实例
const app = getApp()

Page({
  data: {
    analyzeImg: "",
    analyzeResult: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '识别结果'
    })
    this.setData({
      analyzeResult : app.globalData.analyzeResult,
      analyzeImg : app.globalData.analyzeImg
    })
  }
});