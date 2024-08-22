// config/dependencyInjection.ts

import { Container } from 'typedi';
import { getRepository } from 'typeorm';
import { CourseRepository } from '../infrastructure/repositories/CourseRepository';
import { CourseService } from '../application/services/CourseService';
import { CourseEntity } from '../infrastructure/database/entities/CourseEntity';

// Register services
export function setupDependencyInjection() {
    Container.set(CourseRepository, new CourseRepository(getRepository(CourseEntity)));
    Container.set(CourseService, new CourseService(Container.get(CourseRepository)));
}
