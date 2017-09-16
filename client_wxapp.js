wx.request({
 url: 'https://try-it.cn/info',
 data: {
   wxid: wx.id ,
   y: ''
 },
 header: {
   'content-type': 'application/json'
 },
 success: function(res) {
  console.log(res.data)
 }
})

wx.requestPayment({
   'timeStamp': '',
   'nonceStr': '',
   'package': '',
   'signType': 'MD5',
   'paySign': '',
   'success':function(res){
   },
   'fail':function(res){
   }
})

App({
  onLaunch: function() {
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})

wx.getUserInfo({
  success: function(res) {
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country
  }
})

//获取openid
App({  
    globalData:{  
        appid:'1wqas2342dasaqwe2323424ac23qwe',//appid需自己提供，此处的appid我随机编写  
        secret:'e0dassdadef2424234209bwqqweqw123ccqwa',//secret需自己提供，此处的secret我随机编写  
  
    },  
    onLaunch: function () {  
     var that = this  
     var user=wx.getStorageSync('user') || {};    
     var userInfo=wx.getStorageSync('userInfo') || {};   
     if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))&&(!userInfo.nickName)){   
        wx.login({    
        success: function(res){   
            if(res.code) {  
                wx.getUserInfo({  
                    success: function (res) {  
                        var objz={};  
                        objz.avatarUrl=res.userInfo.avatarUrl;  
                        objz.nickName=res.userInfo.nickName;  
                        //console.log(objz);  
                        wx.setStorageSync('userInfo', objz);//存储userInfo  
                    }  
                });  
                var d=that.globalData;//这里存储了appid、secret、token串    
                var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';    
                wx.request({    
                    url: l,    
                    data: {},    
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function(res){   
                        var obj={};  
                        obj.openid=res.data.openid;    
                        obj.expires_in=Date.now()+res.data.expires_in;    
                        //console.log(obj);  
                        wx.setStorageSync('user', obj);//存储openid    
                    }    
                });  
            }else {  
                console.log('获取用户登录态失败！' + res.errMsg)  
            }            
        }    
      });   
    }   
   },  
})  

//获取openid方法二
//页面加载 微信授权
var getInfo = function (thisObj){
  var that = thisObj;
  wx.login({
    success: function (res) {
      if (res.code) {
        //获取openId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
　　　　　　　//小程序唯一标识
            appid: '',
　　 　　 　　//小程序的 app secret
            secret: '',
            grant_type: 'authorization_code',
            js_code: res.code
          },
          method: 'GET',
          header: { 'content-type': 'application/json'},
          success: function(openIdRes){
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              weChatUserInfo.openId = openIdRes.data.openid;
              // 判断openId是否获取成功
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
　　　　　　　　// 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
                wx.getUserInfo({
                  success: function (data) {
                    // 自定义操作
                    // 绑定数据，渲染页面
                    that.setData({
    
                    });
                  },
                  fail: function (failData) {
                      console.info("用户拒绝授权");
                  }
                });
              }else {
                 console.info("获取用户openId失败");
              }
          },
          fail: function(error) {
            console.info("获取用户openId失败");
            console.info(error);
          }
        })
      }
    }
  });
} 

//request方法
Page({
  data: {
    motto: 'wzh ... '
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this

    //技能资讯列表
    wx.request({
      url: 'http://192.168.1.103/yiji/skillList.php',
      method: 'POST',
      data:'pageSize=1&pageNum=10',
      header: {
        'content-type':'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        //这样赋值现在是不能将数据传走的，必须使用setData()方法
        //that.data.items = res.data ;
        //官方文档指出必须使用setData()方法才能将数据传走
        that.setData({
          items: res.data
        })
      }

    })
  }
})
