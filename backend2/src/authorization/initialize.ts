import session from "express-session";

import { oidc } from "./bootstrap";

export const initialize = (app: any) => {
  app.use(session({
    secret: process.env.APP_SECRET || "",
    resave: true,
    saveUninitialized: false
  }));
  app.use(oidc.router);
  app.use('/access-token', oidc.ensureAuthenticated(), async (req, res, next) => {
    res.send(req.userContext.tokens.access_token)
  });
};
