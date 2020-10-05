import * as passport from 'passport';
import User from '../models/user';
import { AsyncLocalStorage } from 'async_hooks';

export default () => {
  passport.serializeUser((user:User, done) => {
    // 로그인 할때 실행
    done(null, user.id)
  });

  passport.deserializeUser(async(id:number, done) => {
    // 라우터가 실행될때 저장
    try {
      const user = await User.findOne({
        where: { id },
      });
      return done(null, user) // req.user
    } catch(err) {
      console.error(err);
      return done(err);
    }
   
  });
}