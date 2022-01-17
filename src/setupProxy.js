const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    // /data
    app.use(
      '/data',
      createProxyMiddleware({
        target: `http://localhost:80`,
        changeOrigin: true,
      })
    );
  app.use(
    '/shorten',
    createProxyMiddleware({
      target: `http://localhost:80`,
      changeOrigin: true,
    })
  );
  app.use(
    '/s/:id',
    createProxyMiddleware({
      target: `http://localhost:80`,
      changeOrigin: true,
    })
  );
};