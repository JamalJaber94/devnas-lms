import { Course } from '../entities/Course';
import { ICourseRepository } from '../repositories/ICourseRepository';


export class CourseManager{
  constructor(private readonly courseRepository : ICourseRepository){}
  async createCourse(title: string,description: string): Promise<Course>{

    try{
      this.validateInput(title,description);
  

          // Then, check for existing course asynchronously
    const exists = await this.courseRepository.findByName(title);
    if (exists) {
      throw new Error('Duplicated Course');
    }

    
      var course = new Course(0,title,description);
      return await this.courseRepository.create(course)
    }
    catch(err){
      throw new Error(`failed to create the course ${err.message}`)
    }
  }
  private validateInput(title: string,description: string) {
    if (!title || title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    if (title.length < 3 || title.length > 100) {
      throw new Error('Title must be between 3 and 100 characters');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
  }
}