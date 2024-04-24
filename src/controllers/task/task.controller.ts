import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Task, TaskSearchParams } from './task.typings';
import { TaskService } from './task.service';
import { User } from '../user/user.typings';
import { setTaskSearchParamsTuthyTypes, setTaskTuthyTypes } from './mappers';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  public getTasks(
    @Req() req: Request,
    @Query() taskSearchParams: TaskSearchParams,
  ): Promise<Task[]> {
    const userId = +req['user']['id'];
    return this.taskService.getTasks(
      userId,
      setTaskSearchParamsTuthyTypes(taskSearchParams),
    );
  }

  @Get(':id')
  public async getTaskById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Task> {
    const res = await this.taskService.getTaskById(+req['user']['id'], +id);
    return res;
  }

  @Post()
  public async createTask(@Req() req: Request, @Body() body): Promise<Task> {
    const userId = +req['user']['id'];
    const task: Task = setTaskTuthyTypes(body);
    task.user = { id: userId } as User;
    return this.taskService.createTask(userId, task);
  }

  @Patch(':id')
  public async updateTask(
    @Req() req: Request,
    @Body() body: Partial<Task>,
    @Param('id') id: number,
  ): Promise<Task> {
    const userId = +req['user']['id'];
    return this.taskService.editTask(
      userId,
      id,
      setTaskTuthyTypes(body as Task),
    );
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
