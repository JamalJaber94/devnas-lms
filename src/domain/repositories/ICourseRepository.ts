import { Course } from '../entities/Course';
import { Lesson } from '../entities/Lesson';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  findAll(): Promise<Course[]>;
  find(id : number): Promise<Course>;
  findByName(title : string): Promise<Course>;
  addLesson(lesson: Lesson): Promise<Lesson>;
}