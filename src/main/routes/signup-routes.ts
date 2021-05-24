import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adaptar';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
