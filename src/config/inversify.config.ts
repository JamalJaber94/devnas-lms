import { Container } from "inversify";
import { CourseController } from "../presentation/controllers/CourseController";
import { CourseService } from "../application/services/CourseService";

const container = new Container();
container.bind<CourseController>(CourseController).toSelf();
container.bind<CourseService>(CourseService).toSelf();

export default container;