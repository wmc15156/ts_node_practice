// declare global을 할려면 무조건 import export가 있어야함
import User from '../models/user'
export {}

declare module "express-serve-static-core" {
    interface Request {
      user?: User
  }
}