'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.all('/report', controller.home.report);
  router.get('/task1', controller.home.task1);
  router.get('/task2', controller.home.task2);
  router.get('/getDayStatics', controller.home.getDayStatics);
  router.get('/getPageStatics', controller.home.getPageStatics);
};
