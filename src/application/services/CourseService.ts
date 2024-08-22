import { ICourseService } from '../../domain/services/ICourseService';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import { Course } from '../../domain/entities/Course';

export class CourseService implements ICourseService {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async createCourse(course: Course): Promise<Course> {
    return this.courseRepository.create(course);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }
}