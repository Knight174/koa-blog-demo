const router = require('koa-router')();

router.prefix('/api/blog');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a blog response!';
});

router.get('/list', function (ctx, next) {
  const { query } = ctx;
  ctx.body = {
    errno: 0,
    query,
    data: ['博客数据'],
  };
});

module.exports = router;
