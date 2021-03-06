const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // /data
  app.use(
    '/data',
    createProxyMiddleware({
      target: `http://localhost:5000`,
      changeOrigin: true,
    })
  );

  // shorten
  app.use(
    '/shorten',
    createProxyMiddleware({
      target: `http://localhost:5000`,
      changeOrigin: true,
    })
  );

  app.use(
    '/s/:id',
    createProxyMiddleware({
      target: `http://localhost:5000`,
      changeOrigin: true,
    })
  );


  // app.use(
  //   '/',
  //   createProxyMiddleware({
  //     target: `http://localhost:5000`,
  //     changeOrigin: true,
  //   })
  // );
};