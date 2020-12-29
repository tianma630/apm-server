const Subscription = require('egg').Subscription;
import { getNextDay } from '../utils/common';

class ApmDaylyPageTask extends Subscription {
  static get schedule() {
    return {
      // interval: '1m',
      cron: '0 0 2 * * *', // 每天2点钟执行
      type: 'worker',
    };
  }

  async subscribe() {
    // console.log('### apm page task start ###', new Date());

    // let st_date = getNextDay(-1);

    // const pages = await this.ctx.service.perfService.getPagesByDate(st_date);

    // for (const page of pages) {
    //   await this.ctx.service.perfService.integrateByPage(st_date, page, 'firstPaint');
    //   await this.ctx.service.perfService.integrateByPage(st_date, page, 'firstContentfulPaint');
    //   await this.ctx.service.perfService.integrateByPage(st_date, page, 'largestContentfulPaint');
    //   await this.ctx.service.perfService.integrateByPage(st_date, page, 'domContentLoaded');
    //   await this.ctx.service.perfService.integrateByPage(st_date, page, 'resourceLoaded');
    // }

    // await this.app.mysql.insert('apm_page_statistics', pages);

    // console.log('### apm page task end ###', new Date());
  }
}

module.exports = ApmDaylyPageTask;