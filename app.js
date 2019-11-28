//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //存储人脸识别的秘钥
    wx.request({
      url: "https://link-crm.com/otherphp/face/secret.php?appId=10109969&bucket=link0&secret_id=AKID0wjhdkfgcN3e5LthcMyPiptobEnBKfdP&secret_key=lP0fEj3LXYRCmBUjnjUFsjQvFSXSGPSK&fileId=", 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync('signStr', res.data.signStr)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => { 
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    analyzeImg: null,
    analyzeResult: null,
    tempPerson: [
      "https://link-crm.com/otherphp/face/img/temp1.png",
      "https://link-crm.com/otherphp/face/img/temp2.png",
      "https://link-crm.com/otherphp/face/img/temp3.png",
      "https://link-crm.com/otherphp/face/img/temp4.png",
      "https://link-crm.com/otherphp/face/img/temp5.png",
      "https://link-crm.com/otherphp/face/img/temp6.png",
      "https://link-crm.com/otherphp/face/img/temp7.png",
      "https://link-crm.com/otherphp/face/img/temp8.png",
      "https://link-crm.com/otherphp/face/img/temp9.png"
    ]
  }
})