import { Injectable } from '@nestjs/common';
import { UserApiService } from 'src/services/database/user-api.service';
import {
  TEST_USER,
  getTestNotesData,
  getTestTasksData,
} from './test.constants';
import { TaskApiService } from 'src/services/database/task-api.service';
import { NoteApiService } from 'src/services/database/note-api.service';
import { TaskWithSpaceIds } from 'src/controllers/task/task.typings';
import { NoteWithSpaceIds } from 'src/controllers/note/note.typings';

@Injectable()
export class TestService {
  constructor(
    private userApiService: UserApiService,
    private taskApiServie: TaskApiService,
    private noteApiService: NoteApiService,
  ) {
    console.log('set test data...');
    setTimeout(() => {
      this.setTestData();
    }, 5000);
  }

  private async setTestData(): Promise<void> {
    const user = await this.userApiService.getUserById(1);
    if (user) {
      return;
    }
    this.setUserData().then(() => {
      this.setTasksData();
      this.setNotesData();
    });
  }

  private async setUserData(): Promise<void> {
    await this.userApiService.addUser(TEST_USER);
  }

  private async setTasksData(): Promise<void> {
    const user = await this.userApiService.getUserByLogin('val');
    await Promise.all(
      getTestTasksData(user).map((task) =>
        this.taskApiServie.createTask(user.id, {
          ...task,
          spaceIds: [],
        } as TaskWithSpaceIds),
      ),
    );
  }

  private async setNotesData(): Promise<void> {
    const user = await this.userApiService.getUserByLogin('val');
    await Promise.all(
      getTestNotesData(user).map((note) =>
        this.noteApiService.createNote(user.id, {
          ...note,
          spaceIds: [],
        } as NoteWithSpaceIds),
      ),
    );
  }
}
