const router = require('koa-router')();

router.prefix('/api/user');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!';
});

router.post('/login', function (ctx, next) {
  const { username, password } = ctx.request.body;
  ctx.body = {
    errno: 0,
    data: {
      username,
      password,
    },
  };
});

router.get('/session-test', async function (ctx, next) {
  if (ctx.session.viewCount === undefined) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount,
  };
});

module.exports = router;
