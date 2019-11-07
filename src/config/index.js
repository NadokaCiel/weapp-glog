const data = process.env.ENV_DATA;
const config = {
  env: data.PRJ_ENV,
  appName: data.APP_NAME,
  appId: data.APP_ID,
  apiKey: data.API_KEY,
  apiCode: data.API_CODE,
  domain: data.DOMAIN,
  version: data.VERSION,
};
export default config;