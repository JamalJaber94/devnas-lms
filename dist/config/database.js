"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const typeorm_1 = require("typeorm");
const CourseEntity_1 = require("../infrastructure/database/entities/CourseEntity");
const initializeDatabase = async () => {
    try {
        await (0, typeorm_1.createConnection)({
            type: 'postgres', // or your preferred database
            host: 'localhost',
            port: 5432,
            username: 'your_username',
            password: 'your_password',
            database: 'your_database',
            entities: [CourseEntity_1.CourseEntity],
            synchronize: true,
        });
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};
exports.initializeDatabase = initializeDatabase;
