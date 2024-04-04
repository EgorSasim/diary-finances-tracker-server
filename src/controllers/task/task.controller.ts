import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Task } from './task.typings';
import { TaskService } from './task.service';
import { User } from '../user/user.typings';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  public getAllTasks(@Req() req: Request): Promise<Task[]> {
    const userId = +req['user']['id'];
    return this.taskService.getAllTasks(userId);
  }

  @Get(':id')
  public async getTaskById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Task> {
    return this.taskService.getTaskById(+req['user']['id'], +id);
  }

  @Post()
  public async createTask(@Req() req: Request, @Body() body): Promise<Task> {
    const userId = +req['user']['id'];
    const task: Task = body;
    task.user = { id: userId } as User;
    return this.taskService.createTask(task);
  }

  @Patch(':id')
  public async updateTask(
    @Req() req: Request,
    @Body() body: Partial<Task>,
    @Param('id') id: number,
  ): Promise<Task> {
    console.log('body: ', body);
    const userId = +req['user']['id'];
    return this.taskService.editTask(userId, id, body);
  }

  @Delete(':id')
  public async removeTask(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Task> {
    const userId = +req['user']['id'];
    return this.taskService.removeTask(userId, id);
  }
}
