import express from 'express';
import { initializeDatabase } from './config/database';
import { getRepository } from 'typeorm';
import { CourseEntity } from './infrastructure/database/entities/CourseEntity';
import { CourseRepository } from './infrastructure/repositories/CourseRepository';
import { CourseService } from './application/services/CourseService';
import { CourseController } from './presentation/controllers/CourseController';

const app = express();
app.use(express.json());

initializeDatabase().then(() => {
  const courseRepository = new CourseRepository(getRepository(CourseEntity));
  const courseService = new CourseService(courseRepository);
  const courseController = new CourseController(courseService);

  app.post('/courses', courseController.createCourse.bind(courseController));
  app.get('/courses', courseController.getCourseList.bind(courseController));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});