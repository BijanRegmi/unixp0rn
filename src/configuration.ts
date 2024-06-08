export type AppConfig = {
  dbUrl: string;
};

export default (): AppConfig => ({
  dbUrl: process.env.DATABASE_URL,
});
