'use strict';

/** @type Egg.EggPlugin */
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.security = {
  xframe: {
    enable: false,
  },
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};