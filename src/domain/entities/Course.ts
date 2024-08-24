import { Lesson } from "./Lesson";

export class Course {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public lessons: Lesson[] = []
  ) {}
}