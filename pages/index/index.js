//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    imgUrls: [
      'https://link-crm.com/otherphp/face/img/1.png',
      'https://link-crm.com/otherphp/face/img/2.png',
      'https://link-crm.com/otherphp/face/img/3.png',
      'https://link-crm.com/otherphp/face/img/4.png'
    ],
    buttons: [
      { 
        img: 'https://link-crm.com/otherphp/face/img/6.png', 
        func: 'analyze',
        title: '人脸检测与分析',
        desc: '对于任意一幅给定的图像，采用智能策略对其进行搜索以确定其中是否含有人脸，如果是则返回人脸的位置、大小和属性分析结果。当前支持的人脸属性有：性别、表情（中性、微笑、大笑）、年龄（误差估计小于5岁）、是否佩戴眼镜（普通眼镜、墨镜）、是否佩戴帽子、是否佩戴口罩。' },
      {
        img: 'https://link-crm.com/otherphp/face/img/5.png',
        func: 'verify',
        title: '人脸对比',
        desc: '通过提取人的面部特征，计算两张人脸的相似度，从而判断是否为同一人，即1 : 1身份验证。人脸验证技术被广泛应用于基于人脸的真实身份验证、人证合一验证等。'
      },
      { 
        img: 'https://link-crm.com/otherphp/face/img/7.png',
        func: 'search',
        title: '人脸检索',
        desc: '给定一张人脸照片，和已有人脸库中的N个人脸进行比对，找出最相似的一张脸或多张脸，并给出相似度排序，即1 : N人脸检索。如果待检索照片中含有多张人脸，则针对每个检测到的人脸，返回与之对应的检索结果。人脸检索应用于用户不需要声明身份的场景，通过在身份照片库中进行人脸检索，确定人群中每个人的身份。' }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 2000
  },
  onLoad: function (options) {
    if (typeof (options.name) != "undefined"){
      wx.showToast({
        title: "分享来自" + options.name,
        icon: 'success',
        duration: 2000
      });
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },
  //获取手机号
  getPhoneNumber: function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }  
  },
  //人脸检测与分析
  analyze: function(){
    wx.navigateTo({
      url: '../analyze/analyze?name=analyze',
    })
  },
  //人脸对比
  verify: function(){
    wx.navigateTo({
      url: '../verify/verify?name=verify',
    })
  },
  //人脸检索
  search: function(){
    wx.navigateTo({
      url: '../search/search?name=search',
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  }
})
