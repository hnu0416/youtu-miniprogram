//analyze.js
//获取应用实例
const app = getApp()

Page({
  data: {
    src: "https://link-crm.com/otherphp/face/img/6.png",
    tempPerson: [],
    signStr: ""
  },
  onLoad: function (options) {
    console.log(options.name)
    wx.setNavigationBarTitle({
      title: '人脸检测与分析'
    })
    this.setData({
      tempPerson: app.globalData.tempPerson,
      signStr: wx.getStorageSync('signStr')
    })
  },
  //获取图片
  getImg: function(){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.showLoading({
          title: '正在处理...'
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const uploadTask = wx.uploadFile({
          url: "https://link-crm.com/otherphp/face/upload.php",
          filePath: res.tempFilePaths[0],
          name: "verifyImg",
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {
            "dir": "analyzeImg"
          }, // HTTP 请求中其他额外的 form data
          success: function (res) {
            that.analyzeImg(res.data);
          },
          fail: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: "图片上传失败",
              icon: 'none',
              duration: 2000
            });
          }
        })
      }
    })
  },
  //使用示例图
  useTempImg: function (event){
    wx.showLoading({
      title: '正在处理...',
    })
    this.analyzeImg(event.target.dataset.url);
  },
  // 分析图片
  analyzeImg: function(imgUrl){
    this.clear()
    wx.request({
      url: "https://link-crm.com/otherphp/face/analyze.php",
      data: {
        "imgUrl": imgUrl,
        "signStr": this.data.signStr
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data;
        if (data.code == 0) {
          app.globalData.analyzeImg = imgUrl
          if (data.data.face[0].gender == 0) {
            data.data.face[0].gender = '女'
          } else {
            data.data.face[0].gender = '男'
          }
          if (data.data.face[0].glass) {
            data.data.face[0].glass = '有'
          } else {
            data.data.face[0].glass = '无'
          }
          if (data.data.face[0].hat == 0) {
            data.data.face[0].hat = '无'
          } else {
            data.data.face[0].hat = '有'
          }
          if (data.data.face[0].mask == 0) {
            data.data.face[0].mask = '无'
          } else {
            data.data.face[0].mask = '有'
          }
          app.globalData.analyzeResult = data.data.face[0];
          wx.navigateTo({
            url: './result',
          })
        } else {
          wx.showToast({
            title: "分析失败",
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: "分析失败",
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  //清空全局对象
  clear: function(){
      app.globalData.analyzeImg = null
      app.globalData.analyzeResult = null
  }
})