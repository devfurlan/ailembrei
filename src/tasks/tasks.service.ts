import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    const tasksList = await this.prisma.task.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    const taskListToReturn = tasksList.map((task) => {
      return {
        id: task.id,
        title: task.title,
        isDone: task.isDone,
      };
    });

    return taskListToReturn;
  }

  findOne(id: string) {
    return this.prisma.task.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
