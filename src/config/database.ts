import { createConnection } from 'typeorm';
import { CourseEntity } from '../infrastructure/database/entities/CourseEntity';
import dotenv from 'dotenv';

dotenv.config();

export const initializeDatabase = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CourseEntity],
      synchronize: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};