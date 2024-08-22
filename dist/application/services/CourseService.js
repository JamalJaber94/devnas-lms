"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async createCourse(course) {
        return this.courseRepository.create(course);
    }
    async getAllCourses() {
        return this.courseRepository.findAll();
    }
}
exports.CourseService = CourseService;
