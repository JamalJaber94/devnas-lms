"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const Course_1 = require("../../domain/entities/Course");
class CourseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(course) {
        const courseEntity = this.repository.create(course);
        await this.repository.save(courseEntity);
        return new Course_1.Course(courseEntity.id, courseEntity.title, courseEntity.description);
    }
    async findAll() {
        const courseEntities = await this.repository.find();
        return courseEntities.map(entity => new Course_1.Course(entity.id, entity.title, entity.description));
    }
}
exports.CourseRepository = CourseRepository;
