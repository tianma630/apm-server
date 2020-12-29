const Service = require('egg').Service;

class ClientService extends Service {

  async getPageList(st_date) {
    return await this.app.mysql.query(`select * from apm_page_statistics where st_date = '${st_date}' order by pv desc`);
  }

  async getIntegrateByDate(st_date) {
    return await this.app.mysql.query(`select * from apm_daily_statistics where st_date = '${st_date}'`);
  }

  async last7chart(st_date) {
    return await this.app.mysql.query(`select * from apm_daily_statistics where st_date > '${st_date}' order by st_date`);
  }

}

module.exports = ClientService;