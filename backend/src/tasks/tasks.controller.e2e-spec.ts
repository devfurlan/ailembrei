import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Tasks (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[GET] /tasks', async () => {
    await prisma.task.createMany({
      data: [
        {
          title: 'Task 01',
        },
        {
          title: 'Task 02',
        },
        {
          title: 'Task 03',
        },
        {
          title: 'Task 04',
        },
      ],
    });

    const response = await request(app.getHttpServer()).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({ title: 'Task 01' }),
      expect.objectContaining({ title: 'Task 02' }),
      expect.objectContaining({ title: 'Task 03' }),
      expect.objectContaining({ title: 'Task 04' }),
    ]);
  });

  test('[POST] /tasks', async () => {
    const response = await request(app.getHttpServer()).post('/tasks').send({
      title: 'test create a task',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');

    const taskOnDatabase = await prisma.task.findFirst({
      where: {
        title: 'test create a task',
      },
    });

    expect(taskOnDatabase).toBeTruthy();
  });

  test('[PATCH] /tasks/:id', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'test update a task',
      },
    });

    const taskId = task.id.toString();

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send({
        title: 'New title task',
      });

    expect(response.statusCode).toBe(204);

    const taskOnDatabase = await prisma.task.findFirst({
      where: {
        title: 'New title task',
      },
    });

    expect(taskOnDatabase).toBeTruthy();
  });

  test('[DELETE] /tasks/:id', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'test delete a task',
      },
    });

    const taskId = task.id.toString();

    const response = await request(app.getHttpServer()).delete(
      `/tasks/${taskId}`,
    );

    expect(response.statusCode).toBe(204);

    const taskOnDatabase = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    expect(taskOnDatabase).toBeNull();
  });
});
