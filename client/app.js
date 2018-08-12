//app.js
let { login: qLogin, setLoginUrl, request } = require('./vendor/wafer2-client-sdk/index')
let config = require('./config')
let userInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
    globalData: {},
    data: {
        locationAuthType: UNPROMPTED
    },
    onLaunch() {
        setLoginUrl(config.service.loginUrl)
    },

    onShow() {
        this.getScreenInfo()
    },
    login({ success, error }) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo'] === false) {

                    this.data.locationAuthType = UNAUTHORIZED
                    // 已拒绝授权
                    wx.showModal({
                        title: '提示',
                        content: '请授权我们获取您的用户信息',
                        showCancel: false
                    })
                    error && error()
                } else {
                    this.data.locationAuthType = AUTHORIZED
                    this.doQcloudLogin({ success, error })
                }
            }
        })
    },


    /**
     * @param {*} param0
     */
    doQcloudLogin({ success, error }) {
        // 调用 qcloud 登陆接口
        qlogin({
            success: result => {
                if (result) {
                    let userInfo = result
                    success && success({
                        userInfo
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    this.getUserInfo({ success, error })
                }
            },
            fail: () => {
                error && error()
            }
        })
    },

    /**
     * 
     * @param {*} param0 
     */
    getUserInfo({ success, error }) {
        if (userInfo) return userInfo

        request({
            url: config.service.requestUrl,
            login: true,
            success: result => {
                let data = result.data

                if (!data.code) {
                    let userInfo = data.data

                    success && success({
                        userInfo
                    })
                } else {
                    error && error()
                }
            },
            fail: () => {
                error && error()
            }
        })
    },

    checkSession({ success, error }) {
        if (userInfo) {
            return success && success({
                userInfo
            })
        }

        wx.checkSession({
            success: () => {
                this.getUserInfo({
                    success: res => {
                        userInfo = res.userInfo

                        success && success({
                            userInfo
                        })
                    },
                    fail: () => {
                        error && error()
                    }
                })
            },
            fail: () => {
                window
                error && error()
            }
        })
    },
    getScreenInfo() {
        this.globalData.sysinf = wx.getSystemInfoSync()
    }
})