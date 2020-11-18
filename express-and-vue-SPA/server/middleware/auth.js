const { User } = require('../database/models');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // DBから一致するusernameのレコードを取得する。
      // DBにアクセスできないなどの根本的なエラーの場合はそこで処理を終わらせる。
      const res = await User.findOne({
        where: {
          username,
        }
      }).then((user) => user)
        .catch((err) => done(err));

      // DBに一致するusernameが無いとnullが返ってくる。
      if (!res) {
        return done(null, false, {
          message: 'ユーザーが見つかりません。',
        });
      }

      // ユーザーが入力したパスワードをハッシュ化したものと、
      // DBに保存されたハッシュ化したパスワードを比較する。
      const comparePassword = await bcrypt.compare(password, res.password_hash);
      if(!comparePassword) {
        return done(null, false, {
          message: 'passwordが正しくありません。'
        });
      }

      // 正常にログイン！
      return done(null, {
        id: res.id,
        username: res.username,
      });
    })
  );

  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id)
    User.findByPk(id).then((user) => {
      if (!user) return done(`error: No UserId => ${id}`);

      return done(null, {
        id: user.id,
        username: user.username,
      });
    });
  });
}
