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
