import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LessonEntity } from './LessonEntity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => LessonEntity, lesson => lesson.course)
  lessons: LessonEntity[];
}