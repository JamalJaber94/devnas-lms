import { Request, Response } from 'express';
import { ICourseService } from '../../domain/services/ICourseService';
import { Course } from '../../domain/entities/Course';

export class CourseController {
  constructor(private readonly courseService: ICourseService) {}

  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const course = new Course(0, title, description);
      const createdCourse = await this.courseService.createCourse(course);
      res.status(201).json(createdCourse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create course, ' + error.message });
    }
  }

  async getCourseList(req: Request, res: Response): Promise<void> {
    try {
      const courses = await this.courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }
}