const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
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
  // /data
  app.use(
    '/data',
    createProxyMiddleware({
      target: `http://localhost:5000`,
      changeOrigin: true,
    })
  );
};