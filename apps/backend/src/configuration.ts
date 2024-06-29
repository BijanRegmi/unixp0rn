export type AppConfig = {
  dbUrl: string;
  token: string;
  dataUrl: string;
  imageUrl: string;
  dbSsl: boolean;
  port: number;
};

export default (): AppConfig => ({
  port: +(process.env.PORT || 3000),
  dbUrl: process.env.DATABASE_URL || '',
  token: process.env.TOKEN || '',
  dataUrl: process.env.DATA_URL || '',
  imageUrl: process.env.IMAGE_URL || '',
  dbSsl: process.env.DATABASE_SSL === 'true',
});
