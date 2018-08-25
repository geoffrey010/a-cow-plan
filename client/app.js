//app.js
let { login: qLogin } = require('./vendor/wafer2-client-sdk/index')
const qcloud = require('./vendor/wafer2-client-sdk/index')
let config = require('./config')
let userInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
    globalData: {},
    data: {
        locationAuthType: UNPROMPTED,
        userInfo: ''
    },
    onLaunch() {
        qcloud.setLoginUrl(config.service.loginUrl)

    },

    onShow() {
        this.login({
            success: res => {

            }
        })
    },
    getInfo({ sucess, error }) {
        wx.getUserInfo({
            success: res => {
                sucess && sucess({ userInfo })
            },
            fail: err => {
                qcloud.login({
                    success: res => {
                        if (res) {
                            let session = qcloud.Session.get()
                            console.log('qcloud.login->sucess->session.get():')
                            console.log(session)
                        }
                    }
                })
            }
        })
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
                    userInfo = res.authSetting['scope.userInfo']
                    this.data.locationAuthType = AUTHORIZED
                    this.doQcloudLogin({
                        success,
                        error
                    })
                }
            }
        })
    },


    /**
     * @param {*} param0
     */
    doQcloudLogin({ success, error }) {
        // 调用 qcloud 登陆接口
        if (this.data.locationAuthType === AUTHORIZED) {
            this.getInfo({ success, error })
        } else {
            qLogin({
                success: result => {
                    if (result) {
                        let userInfo = result
                        success && success({
                            userInfo
                        })
                    } else {
                        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                        this.checkSession({
                            success,
                            error
                        })
                    }
                },
                fail: () => {
                    error && error()
                }
            })
        }
    },

    /**
     * 
     * @param {*} param0 
     */
    getUserInfo({ success, error }) {
        if (userInfo) return userInfo
        qcloud.request({
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
        let se = qcloud.Session.get()
        return se ? (success && success(se)) : (error && error())
    }
})