"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const Course_1 = require("../../domain/entities/Course");
class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(req, res) {
        try {
            const { title, description } = req.body;
            const course = new Course_1.Course(0, title, description);
            const createdCourse = await this.courseService.createCourse(course);
            res.status(201).json(createdCourse);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create course' });
        }
    }
    async getCourseList(req, res) {
        try {
            const courses = await this.courseService.getAllCourses();
            res.status(200).json(courses);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch courses' });
        }
    }
}
exports.CourseController = CourseController;
