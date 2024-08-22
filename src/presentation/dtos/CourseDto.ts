import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsNotEmpty
} from 'class-validator'

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CourseDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  description: string;
}