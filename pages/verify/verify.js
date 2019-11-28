//verify.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrlA: "https://link-crm.com/otherphp/face/img/temp5.png",
    imgUrlB: "https://link-crm.com/otherphp/face/img/temp6.png",
    uploadNum: "0"
  },
  onLoad: function (options) {
    console.log(options.name)
    wx.setNavigationBarTitle({
      title: '人脸对比'
    })
    this.setData({
      signStr: wx.getStorageSync('signStr')
    })
  },
  verify: function(){
    wx.showLoading({
      title: '正在处理...',
    })
    wx.request({
      url: "https://link-crm.com/otherphp/face/verify.php",
      data: {
        "imgUrlA": this.data.imgUrlA,
        "imgUrlB": this.data.imgUrlB,
        "signStr": this.data.signStr
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data;
        if (data.code == 0) {
          wx.showToast({
            title: "相似度" + data.data.similarity + "%",
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: "请求失败",
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: "请求失败",
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  getImg: function (event){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '正在上传...' + that.data.uploadNum + "%",
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
            "dir": "verifyImg"
          }, // HTTP 请求中其他额外的 form data
          success: function (res) {
            wx.hideLoading()
            if (event.target.dataset.type == 'A') {
              that.setData({
                imgUrlA: res.data
              })
            } else {
              that.setData({
                imgUrlB: res.data
              })
            }
          },
          fail: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: "请求失败",
              icon: 'none',
              duration: 2000
            });
          }
        })
        uploadTask.onProgressUpdate((res) => {
          that.setData({
            uploadNum: res.progress
          })
        })
      }
    })
  }
})