'use strict';

const Controller = require('egg').Controller;
const { addDays } = require('../utils/common');

class HomeController extends Controller {
  async report() {
    console.log(this.ctx.request.body);

    const data = typeof this.ctx.request.body === 'string' ? JSON.parse(this.ctx.request.body) : this.ctx.request.body;

    await this.app.mysql.insert('apm_performance', data);

    this.ctx.body = { status: 'success' };
  }

  async task1() {
    let st_date = '2020-12-28';

    const pages = await this.ctx.service.perfService.getPagesByDate(st_date);

    for (const page of pages) {
      await this.ctx.service.perfService.integrateByPage(st_date, page, 'firstPaint');
      await this.ctx.service.perfService.integrateByPage(st_date, page, 'firstContentfulPaint');
      await this.ctx.service.perfService.integrateByPage(st_date, page, 'largestContentfulPaint');
      await this.ctx.service.perfService.integrateByPage(st_date, page, 'domContentLoaded');
      await this.ctx.service.perfService.integrateByPage(st_date, page, 'resourceLoaded');
    }

    if (pages && pages.length > 0) {
      await this.app.mysql.insert('apm_page_statistics', pages);
    }

    this.ctx.body = 'success';
  }

  async task2() {
    let st_date = '2020-12-28';
    const pages = await this.ctx.service.perfService.getPvByDate(st_date);
    const page = pages[0];

    await this.ctx.service.perfService.integrateByDate(st_date, page, 'firstPaint');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'firstContentfulPaint');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'largestContentfulPaint');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'domContentLoaded');
    await this.ctx.service.perfService.integrateByDate(st_date, page, 'resourceLoaded');

    await this.app.mysql.insert('apm_daily_statistics', page);

    this.ctx.body = 'success';
  }

  async getPageStatics() {
    this.ctx.body = await this.ctx.service.clientService.getPageList(this.ctx.query.date);
  }

  async getDayStatics() {
    let lastDay = addDays(this.ctx.query.date, -1);
    let lastWeek = addDays(this.ctx.query.date, -7);

    this.ctx.body = {
      today: await this.ctx.service.clientService.getIntegrateByDate(this.ctx.query.date),
      last: await this.ctx.service.clientService.getIntegrateByDate(lastDay),
      last7Chart: await this.ctx.service.clientService.last7chart(lastWeek),
    }
  }
}

module.exports = HomeController;