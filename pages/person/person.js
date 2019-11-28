//person.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '来快活呀',
      path: '/pages/index/index?name=' + app.globalData.userInfo.nickName,
      imageUrl: 'https://link-crm.com/otherphp/face/img/6.png',
      success: function (res) {
        console.log(res.shareTickets[0])
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
});