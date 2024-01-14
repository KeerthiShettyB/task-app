import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    const task = { title: 'Test Task', description: 'Test Description', dueDate: new Date(), status: 'Incomplete' };
    service.addTask(task);
    expect(service.getTasks()).toContain(task);
  });

  it('should not mark a non-existent task as completed', () => {
    const initialTasks = service.getTasks();
    service.markTaskAsCompleted(99);
    expect(service.getTasks()).toEqual(initialTasks);
  });

  it('should delete a task', () => {
    const task = { id: 1, title: 'Test Task', description: 'Test Description', dueDate: new Date(), status: 'Incomplete' };
    service.addTask(task);
    service.deleteTask(1);
    expect(service.getTasks().some(t => t.id === 1)).toBeFalsy();
  });
});
