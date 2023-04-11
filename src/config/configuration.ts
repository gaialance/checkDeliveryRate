export default () => ({
  env: process.env.NODE_ENV || 'production',
  version: '1.0.19', // Track backend version number here
  port: parseInt(process.env.PORT, 10) || 3000,
  TZ: process.env.TZ || 'Asia/Kuala_Lumpur',
  database: {
    type: process.env.DB_TYPE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    nameTest: '',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
  throttle: {
    ttl: 60,
    limit: 6000,
  },
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpires: process.env.NODE_ENV === 'production' ? '30m' : '60m',
    jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
    jwtRefreshExpires: '7d',
    zCityAppLoginSecretKey: process.env.ZCITY_APP_LOGIN_SECRET_KEY,
    publicApiSecretKey: process.env.PUBLIC_API_SECRET_KEY,
  }
});
