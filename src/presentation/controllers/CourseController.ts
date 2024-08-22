import { JsonController, Get, Post, Body } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
//import { ICourseService } from '../../domain/services/ICourseService';
import { CourseService } from '../../application/services/CourseService';
import { Course } from '../../domain/entities/Course';
import { CreateCourseDto, CourseDto } from '../dtos/CourseDto';

@JsonController('/courses')
@Service()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @OpenAPI({ summary: 'Create a new course' })
  @ResponseSchema(CourseDto)
  async createCourse(@Body() courseData: CreateCourseDto): Promise<CourseDto> {
    const course = new Course(0, courseData.title, courseData.description);
    const createdCourse = await this.courseService.createCourse(course);
    return { id: createdCourse.id, title: createdCourse.title, description: createdCourse.description };
  }

  @Get()
  @OpenAPI({ summary: 'Get all courses' })
  @ResponseSchema(CourseDto, { isArray: true })

  async getCourseList(): Promise<CourseDto[]> {
    console.log(this.courseService)
    const courses = await this.courseService.getAllCourses();
    return courses.map(course => ({ id: course.id, title: course.title, description: course.description }));
  }
}