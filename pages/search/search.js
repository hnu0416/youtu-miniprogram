//search.js
//获取应用实例
const app = getApp()

Page({
  data: {
    src: "https://link-crm.com/otherphp/face/img/7.png"
  },
  onLoad: function (options) {
    console.log(options.name)
    wx.setNavigationBarTitle({
      title: '人脸检索'
    })
  }
})