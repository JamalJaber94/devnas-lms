"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const typeorm_1 = require("typeorm");
const CourseEntity_1 = require("./infrastructure/database/entities/CourseEntity");
const CourseRepository_1 = require("./infrastructure/repositories/CourseRepository");
const CourseService_1 = require("./application/services/CourseService");
const CourseController_1 = require("./presentation/controllers/CourseController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, database_1.initializeDatabase)().then(() => {
    const courseRepository = new CourseRepository_1.CourseRepository((0, typeorm_1.getRepository)(CourseEntity_1.CourseEntity));
    const courseService = new CourseService_1.CourseService(courseRepository);
    const courseController = new CourseController_1.CourseController(courseService);
    app.post('/courses', courseController.createCourse.bind(courseController));
    app.get('/courses', courseController.getCourseList.bind(courseController));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
