import {TaskListComponent} from './task-list.component';
import {render} from '@testing-library/angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {byRole, byText} from 'testing-library-selector';
import {TaskService} from '../service/task.service';
import {of} from 'rxjs';
import {StoreEnum} from '../shared/LadenEnum';
import {StatusEnum} from '../shared/StatusEnum';
import {Task} from '../shared/Task';
import {AuthService} from '../auth/auth.service';
import {createMock} from '@testing-library/angular/jest-utils';

const ui = {
  rowHeader: byRole('row', {name: 'Laden Betreff Erstellungsdatum Status'}),
  rowDataFirst: byRole('row', {name: 'Zentrale Subject CreationDate Wähle den Status'}),
  rows: byRole('row'),
  tableEmptyState: byText('Keine Aufgaben vorhanden'),
  addTaskButton: byRole('button', {name: 'Hinzufügen'})
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
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () => { return of(getSampleTasks()); }
          }
        },
        {
          provide: AuthService,
          useValue: createMock(AuthService)
        }
      ]
    });

    // act & assert
    ui.rowDataFirst.get();
    expect(ui.rows.queryAll()).toHaveLength(2);
    expect(ui.tableEmptyState.query()).not.toBeInTheDocument();
  });

  it('should render table empty state',  async () => {
    // arrange
    await render(TaskListComponent, {
      imports: [
          HttpClientTestingModule
      ],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () => { return of([]); }
          }}
      ]
    });

    // act & assert
    ui.tableEmptyState.get();
  });

  it('should render add task button',  async () => {
    // arrange
    await render(TaskListComponent, {
      imports: [
          HttpClientTestingModule
      ],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () => { return of([]); }
          }}
      ]
    });

    // act & assert
    ui.addTaskButton.get();
  });

  function getSampleTasks(): Task[] {
    return [{
      taskId: 12,
      subject: 'Subject',
      description: 'Description',
      creator: 'Creator',
      location: StoreEnum.Zentrale,
      creationDate: 'CreationDate',
      assignee: 'Assignee',
      status: StatusEnum.Offen,
      images: [],
      forwardedTo: ''
    }];
  }
});
