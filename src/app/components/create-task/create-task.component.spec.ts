import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CreateTaskComponent } from './create-task.component';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MatFormFieldControlMock {
  setDescribedByIds = jasmine.createSpy('setDescribedByIds');
  onContainerClick = jasmine.createSpy('onContainerClick');
}

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, MatFormFieldModule, MatSelectModule,ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,],
      providers: [
        { provide: MatFormFieldControl, useClass: MatFormFieldControlMock }
      ]
    }).compileComponents();
    
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should require a title', () => {
    const titleControl = component.taskForm.get('title');
    titleControl?.setValue('');
    expect(titleControl?.hasError('required')).toBeTruthy();
  });

  it('should require a due date', () => {
    const dueDateControl = component.taskForm.get('dueDate');
    dueDateControl?.setValue('');
    expect(dueDateControl?.hasError('required')).toBeTruthy();
  });

  it('should allow a valid form submission', () => {
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2022-01-13',
      status: 'Incomplete',
    });
    expect(component.taskForm.valid).toBeTruthy();
  });

  it('should prevent form submission with invalid data', () => {
    component.taskForm.setValue({
      title: '',
      description: 'Test Description',
      dueDate: '',
      status: 'Incomplete',
    });
    expect(component.taskForm.valid).toBeFalsy();
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate when the form is invalid', () => {
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
