const DB = require('../utils/db')

module.exports = {
    getAllSchedule: async ctx => {
        let { month } = ctx.params
        let res = await DB.query("SELECT DATE_FORMAT(date, '%Y%m%d') AS date, data FROM `schedule` WHERE DATE_FORMAT(date, '%Y%m') = ?", month)
        ctx.state.data = res
    },

    getConfig: async ctx => {
        ctx.state.data = await DB.query('SELECT scheduling_id,scheduling_name,worker_mix,worker_max FROM scheduling')
    },

    getSelectedDay: async ctx => {
        let { date } = ctx.params
        ctx.state.data = await DB.query("SELECT date FROM `schedule` WHERE DATE_FORMAT(date, '%Y%m%d') = ?", date)
    }
}
