const Subscription = require('egg').Subscription;
const { getNextDay } = require('../utils/common');

class ApmDaylyPageTask extends Subscription {
  static get schedule() {
    return {
      cron: '0 0 2 * * *', // 每天2点钟执行
      type: 'worker',
    };
  }

  async subscribe() {
    console.log('### apm day task start ###', new Date());

    let st_date = getNextDay(-1);

    const pages = await this.ctx.service.perfService.getPvByDate(st_date);
    const page = pages[0];

    await this.ctx.service.perfService.integrateByDate(st_date, page, 'firstPaint');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'firstContentfulPaint');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'largestContentfulPaint');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'domContentLoaded');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'resourceLoaded');

    await this.app.mysql.insert('apm_daily_statistics', page);

    console.log('### apm day task end ###', new Date());
  }
}

module.exports = ApmDaylyPageTask;