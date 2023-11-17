import {TaskListComponent} from './task-list.component';
import {render} from '@testing-library/angular';

describe('TaskListComponent',() => {
  it('should render table headers', async () => {
    // arrange
    await render(TaskListComponent, {});

    // act

    // assert
  });
});
