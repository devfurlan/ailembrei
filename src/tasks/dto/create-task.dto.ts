import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;
}
