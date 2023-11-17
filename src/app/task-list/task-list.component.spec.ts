import {TaskListComponent} from './task-list.component';
import {render} from '@testing-library/angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {byRole} from 'testing-library-selector';
import {TaskService} from '../service/task.service';
import {of} from 'rxjs';
import {LadenEnum} from '../shared/LadenEnum';
import {StatusEnum} from '../shared/StatusEnum';
import {Task} from '../shared/Task';

const ui = {
  rowHeader: byRole('row', {name: 'Betreff Erstellungsdatum Laden Status'}),
  rowDataFirst: byRole('row', {name: 'Subject CreationDate Zentrale Offen'}),
  rows: byRole('row')
};

describe('TaskListComponent',() => {

  it('should render table headers', async () => {
    // arrange
    await render(TaskListComponent, {
      imports: [
        HttpClientTestingModule
      ]
    });

    // act & assert
    ui.rowHeader.get();
  });

  it('should render table data',  async () => {
    // arrange
    await render(TaskListComponent, {
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () => { return of(getSampleTasks()); }
          }}
      ]
    });

    // act & assert
    ui.rowDataFirst.get();
    expect(ui.rows.queryAll()).toHaveLength(2);
  });

  function getSampleTasks(): Task[] {
    return [{
      subject: 'Subject',
      description: 'Description',
      creator: 'Creator',
      location: LadenEnum.Zentrale,
      creationDate: 'CreationDate',
      assignee: 'Assignee',
      status: StatusEnum.Offen
    }];
  }
});
