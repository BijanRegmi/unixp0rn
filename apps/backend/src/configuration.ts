export type AppConfig = {
  dbUrl: string;
  token: string;
  dataUrl: string;
  imageUrl: string;
};

export default (): AppConfig => ({
  dbUrl: process.env.DATABASE_URL || '',
  token: process.env.TOKEN || '',
  dataUrl: process.env.DATA_URL || '',
  imageUrl: process.env.IMAGE_URL || '',
});
