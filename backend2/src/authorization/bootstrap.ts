import OktaJwtVerifier from "@okta/jwt-verifier";
import { Client } from "@okta/okta-sdk-nodejs";
import { ExpressOIDC } from "@okta/oidc-middleware";

export const verifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`
});

export const client = new Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
});

export const oidc = new ExpressOIDC({
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  appBaseUrl: process.env.HOST_URL,
  scope: "openid profile"
});
