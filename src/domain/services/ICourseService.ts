import { Course } from '../entities/Course';

export interface ICourseService {
  createCourse(course: Course): Promise<Course>;
  getAllCourses(): Promise<Course[]>;
}