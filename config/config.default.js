/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605768185025_6516';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
      '.nj': 'nunjucks',
    },
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'rm-uf62h6eo44n31kpgd.mysql.rds.aliyuncs.com',
      // 端口号
      port: '3306',
      // 用户名
      user: 'xtest',
      // 密码
      password: 'Whv3SAtanYPzf6qN',
      // 数据库名
      database: 'x_live',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',//匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/plain', 'application/json', 'text/json'],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
