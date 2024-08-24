import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CourseEntity } from './CourseEntity';

@Entity('lessons')
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  courseId: number;

  @ManyToOne(() => CourseEntity, course => course.lessons)
  @JoinColumn({ name: "courseId" })
  course: CourseEntity;
}