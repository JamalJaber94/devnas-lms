import { JsonController, Get, Post, Body, Put } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { CourseService } from '../../application/services/CourseService';
import { CreateCourseDto, CourseDto, CreateLessonDto, LessonDto } from '../dtos/CourseDto';

@JsonController('/courses')
@Service()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @OpenAPI({ summary: 'Create a new course' })
  @ResponseSchema(CourseDto)
  async createCourse(@Body() courseData: CreateCourseDto): Promise<CourseDto> {
    const createdCourse = await this.courseService.createCourse(courseData.title,courseData.description);
    return { id: createdCourse.id, title: createdCourse.title, description: createdCourse.description,lessons:createdCourse.lessons };
  }
  @Put()
  @OpenAPI({ summary: 'add lesson to course' })
  @ResponseSchema(LessonDto)
  async addLesson(@Body() lessonData: CreateLessonDto): Promise<LessonDto> {
    const createdLesson = await this.courseService.addLesson(lessonData.courseId,lessonData.title,lessonData.content);
    return { id: createdLesson.id, title: createdLesson.title, content: createdLesson.content,courseId:createdLesson.courseId };
  }
  @Get()
  @OpenAPI({ summary: 'Get all courses' })
  @ResponseSchema(CourseDto, { isArray: true })

  async getCourseList(): Promise<CourseDto[]> {
    console.log(this.courseService)
    const courses = await this.courseService.getAllCourses();
    return courses.map(course => ({ id: course.id, title: course.title, description: course.description,lessons:course.lessons }));
  }
}