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
import { SpaceService } from './space.service';
import { SpaceEntity } from 'src/model/space.entity';
import { FindOptionsWhere } from 'typeorm';
import { Space, SpaceCreateParams } from './space.typings';

@Controller('note')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Get()
  public async getSpaces(@Req() req: Request): Promise<SpaceEntity[]> {
    const userId = +req['user']['id'];
    const searchParams: FindOptionsWhere<SpaceEntity> = { id: userId };
    return this.spaceService.getSpaces(searchParams);
  }

  @Get(':id')
  public async getSpaceById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<SpaceEntity> {
    const userId = +req['user']['id'];
    const searchParams: FindOptionsWhere<SpaceEntity> = {
      user: { id: userId },
      id,
    };
    return this.spaceService.getSpace(searchParams);
  }

  @Post()
  public async createSpace(
    @Req() req: Request,
    @Body() body: SpaceCreateParams,
  ): Promise<Space> {
    const userId = +req['user']['id'];
    return this.spaceService.createSpace(
      body.space,
      userId,
      body.taskIds,
      body.noteIds,
    );
  }

  @Patch(':id')
  public async updateSpace(
    @Req() req: Request,
    @Body() body: Partial<Space>,
    @Param('id') id: number,
  ): Promise<SpaceEntity> {
    const userId = +req['user']['id'];
    return this.spaceService.editSpace(userId, id, body);
  }

  @Delete(':id')
  public async removeSpace(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Space> {
    const userId = +req['user']['id'];
    return this.spaceService.removeSpace(userId, id);
  }
}
