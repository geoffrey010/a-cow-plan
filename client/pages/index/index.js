//index.js
const { Session, loginWithCode, login: qLogin, request } = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')
const app = getApp()

Page({

    data: {
        userInfo: '',
        year: '',
        month: '',
        day: '',
        slectedDay: '',
        selected: false,
        logged: null,
        takeSession: true,
        requestResult: '',
        locationAuthType: app.data.locationAuthType
    },

    emptySelected() {
        this.setData({
            selected: false,
            slectedDay: ''
        })
    },

    /**
     * @method  日历组件单击日期触发事件
     * @param   {Event} e
     */
    handleSelecteDate(e) {

        this.setData({
            selected: true,
            slectedDay: e.detail.date
        })
        let res = { detail: this.data.slectedDay }
        this.bindChange(res)
        wx.showToast({ title: `${e.detail.date}`, icon: null })
    },

    // 用户登录示例
    login() {
        app.login({
            /**
             * @arg userInfo Object 用户信息
             */
            success: ({ userInfo }) => {
                this.setData({
                    userInfo,
                    locationAuthType: app.data.locationAuthType
                })
            },
            error: () => {
                this.setData({
                    locationAuthType: app.data.locationAuthType
                })
            }
        })
    },

    getScheduleMonthly() {
        let month = this.data.year + '' + this.data.month
        request({
            url: config.service.scheduleMonthly + month,
            success: ctx => {
                let arr = ctx.data.data
                for (let item in arr) {
                    let str = arr[item].data

                    console.log(JSON.parse(str))
                }
            }
        })
    },

    bindChange(e) {
        let [year, month, day] = e.detail.split('-')
        this.setData({
            year,
            month,
            day
        })
    },

    // checkUserIsLogin() {
    //     let { logged, userInfo } = getApp().globalData
    //     if (logged && userInfo) {
    //         this.setData({
    //             userInfo,
    //             logged: true
    //         })
    //     }
    // },

    onLoad() {
        // let { WindowHigh } = getApp().globalData.sysinf
    },

    onShow() {
        // 同步授权状态
        this.setData({
            locationAuthType: app.data.locationAuthType
        })
        app.checkSession({
            success: ({ userInfo }) => {
                this.setData({
                    userInfo
                })
            }
        })
    }
})
