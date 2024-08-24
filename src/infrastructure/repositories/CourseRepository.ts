import { Repository } from 'typeorm';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import { Course } from '../../domain/entities/Course';
import { CourseEntity } from '../database/entities/CourseEntity';
import { Lesson } from '../../domain/entities/Lesson';
import { LessonEntity } from '../database/entities/LessonEntity';

export class CourseRepository implements ICourseRepository {
  constructor(private readonly repository: Repository<CourseEntity>,
    private readonly lessonRepository: Repository<LessonEntity>
  ) {}
 async addLesson(lesson: Lesson): Promise<Lesson> {
    const lessonEntity = this.lessonRepository.create(lesson);

    console.log(lessonEntity)
    await this.lessonRepository.save(lessonEntity);
    return new Lesson(lesson.id, lesson.title, lesson.content,lesson.courseId); 
   }
 async find(id: number): Promise<Course> {
  const courseEntity = await this.repository.findOneBy({id})

  if (!courseEntity) {
    return null;
  }

  return new Course(courseEntity.id, courseEntity.title, courseEntity.description);
  }
 async findByName(title: string): Promise<Course> {
  const courseEntity = await this.repository.findOneBy({title})

  if (!courseEntity) {
    return null;
  }

  return new Course(courseEntity.id, courseEntity.title, courseEntity.description);

}

  async create(course: Course): Promise<Course> {
    const courseEntity = this.repository.create(course);
    await this.repository.save(courseEntity);
    return new Course(courseEntity.id, courseEntity.title, courseEntity.description);
  }

  async findAll(): Promise<Course[]> {
    const courseEntities = await this.repository.find({relations: ['lessons']});

    console.log(courseEntities)
    return courseEntities.map(entity => new Course(entity.id, entity.title, entity.description,
      entity.lessons.map(lesson => new Lesson(
        lesson.id,
        lesson.title,
        lesson.content,
        entity.id
      ))
    ));
  }
}