const Service = require('egg').Service;

const indexes = {'firstPaint': 's', 'firstContentfulPaint': 's', 'largestContentfulPaint': 's', 'domContentLoaded': 'l', 'resourceLoaded': 'l'};

class PerfService extends Service {

  async getPagesByDate(st_date) {
    return await this.app.mysql.query(`
      select '${st_date}' as st_date, page, count(1) as pv
      from apm_performance 
        where date_format(create_time, '%Y-%m-%d') = '${st_date}'
        group by page
        order by pv desc
    `);
  }

  async integrateByPage(st_date, page, index) {
    let cnt = await this.app.mysql.query(`select count(1) as cnt from apm_performance where date_format(create_time, '%Y-%m-%d') = '${st_date}' and page = '${page.page}' and ${index} > 0`);
    let median = await this.app.mysql.query(`select ${index} from apm_performance where date_format(create_time, '%Y-%m-%d') = '${st_date}' and page = '${page.page}' and ${index} > 0 order by (${index} + 0) limit ${Math.round(cnt[0].cnt / 2)}, 1`);
    let avg = await this.app.mysql.query(`select avg(${index}) as avg from apm_performance where date_format(create_time, '%Y-%m-%d') = '${st_date}' and page = '${page.page}' and ${index} > 0`);

    let chart = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, };
    let ret = await this.app.mysql.query(`
        SELECT COUNT(1) AS amount, fpg
          FROM (
            SELECT CASE 
                WHEN ${index} < ${indexes[index] === 's' ? 200 : 500} THEN 'a'
                WHEN ${index} < ${indexes[index] === 's' ? 400 : 1000} THEN 'b'
                WHEN ${index} < ${indexes[index] === 's' ? 600 : 1500} THEN 'c'
                WHEN ${index} < ${indexes[index] === 's' ? 800 : 2000} THEN 'd'
                WHEN ${index} < ${indexes[index] === 's' ? 1000 : 2500} THEN 'e'
                WHEN ${index} < ${indexes[index] === 's' ? 1200 : 3000} THEN 'f'
                WHEN ${index} < ${indexes[index] === 's' ? 1400 : 3500} THEN 'g'
                WHEN ${index} < ${indexes[index] === 's' ? 1600 : 4000} THEN 'h'
                WHEN ${index} < ${indexes[index] === 's' ? 1800 : 4500} THEN 'i'
                ELSE 'j'
              END AS fpg
            FROM apm_performance
            WHERE date_format(create_time, '%Y-%m-%d') = '${st_date}' and ${index} > 0 and page = '${page.page}'
          ) a
          GROUP BY fpg;
      `);

    ret.forEach(r => {
      chart[r.fpg] = r.amount;
    });

    page[`${index}Avarage`] = avg[0].avg;
    page[`${index}Median`] = median[0] ? median[0][index] : 0;
    page[`${index}Chart`] = JSON.stringify(chart);
  }

  async getPvByDate(st_date) {
    return await this.app.mysql.query(`
      select '${st_date}' as st_date, count(1) as pv
      from apm_performance 
        where date_format(create_time, '%Y-%m-%d') = '${st_date}'
    `);
  }

  async integrateByDate(st_date, page, index) {
    let cnt = await this.app.mysql.query(`select count(1) as cnt from apm_performance where date_format(create_time, '%Y-%m-%d') = '${st_date}' and ${index} > 0`);
    let median = await this.app.mysql.query(`select ${index} from apm_performance where date_format(create_time, '%Y-%m-%d') = '${st_date}' and ${index} > 0 order by (${index} + 0) limit ${Math.round(cnt[0].cnt / 2)}, 1`);
    let avg = await this.app.mysql.query(`select avg(${index}) as avg from apm_performance where date_format(create_time, '%Y-%m-%d') = '${st_date}' and ${index} > 0`);
  
    page[`${index}Median`] = median[0] ? median[0][index] : 0;
    page[`${index}Avarage`] = avg[0].avg;
  }

}

module.exports = PerfService;