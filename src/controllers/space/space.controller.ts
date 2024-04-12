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
import { mapSpaceEntityToSpace } from './space.helpers';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Get()
  public async getSpaces(@Req() req: Request): Promise<SpaceEntity[]> {
    const userId = +req['user']['id'];
    const searchParams: FindOptionsWhere<SpaceEntity> = {
      user: { id: userId },
    };
    return this.spaceService.getSpaces(searchParams);
  }

  @Get(':id')
  public async getSpaceById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Space> {
    const userId = +req['user']['id'];
    const searchParams: FindOptionsWhere<SpaceEntity> = {
      user: { id: userId },
      id,
    };
    const entity = await this.spaceService.getSpace(searchParams);
    return mapSpaceEntityToSpace(entity);
  }

  @Post()
  public async createSpace(
    @Req() req: Request,
    @Body() body: SpaceCreateParams,
  ): Promise<Space> {
    const userId = +req['user']['id'];
    const entity = await this.spaceService.createSpace(
      { name: body.name, id: null, noteIds: [], taskIds: [] },
      userId,
      body.taskIds,
      body.noteIds,
    );
    return mapSpaceEntityToSpace(entity);
  }

  @Patch(':id')
  public async updateSpace(
    @Req() req: Request,
    @Body() body: Partial<Space>,
    @Param('id') id: number,
  ): Promise<Space> {
    const userId = +req['user']['id'];
    const entity = await this.spaceService.editSpace(userId, id, body);
    return mapSpaceEntityToSpace(entity);
  }

  @Delete(':id')
  public async removeSpace(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Space> {
    const userId = +req['user']['id'];
    const entity = await this.spaceService.removeSpace(userId, id);
    return mapSpaceEntityToSpace(entity);
  }
}
