import { Course } from '../entities/Course';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  findAll(): Promise<Course[]>;
  find(id : number): Promise<Course>;
  findByName(title : string): Promise<Course>;
}