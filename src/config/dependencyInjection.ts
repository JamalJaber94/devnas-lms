// config/dependencyInjection.ts

import { Container } from 'typedi';
import { getRepository } from 'typeorm';
import { CourseRepository } from '../infrastructure/repositories/CourseRepository';
import { CourseService } from '../application/services/CourseService';
import { CourseEntity } from '../infrastructure/database/entities/CourseEntity';
import { CourseManager } from '../domain/services/CourseManager';
import { LessonEntity } from '../infrastructure/database/entities/LessonEntity';

// Register services
export function setupDependencyInjection() {
    Container.set(CourseRepository, new CourseRepository(getRepository(CourseEntity),getRepository(LessonEntity)));
    Container.set(CourseManager, new CourseManager(Container.get(CourseRepository)));
    Container.set(CourseService, new CourseService(Container.get(CourseRepository),Container.get(CourseManager)));
}
