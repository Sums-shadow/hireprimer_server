export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/hireprime',
});
