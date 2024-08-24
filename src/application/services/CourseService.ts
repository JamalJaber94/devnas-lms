import { CourseManager } from '../../domain/services/CourseManager';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import { CourseDto } from '../../presentation/dtos/CourseDto';

export class CourseService {
  constructor(private readonly courseRepository: ICourseRepository,
    private readonly courseManager: CourseManager
  ) {}

  async createCourse(title: string,description: string): Promise<CourseDto> {
    return this.courseManager.createCourse(title,description);
  }

  async getAllCourses(): Promise<CourseDto[]> {
    return this.courseRepository.findAll();
  }
}