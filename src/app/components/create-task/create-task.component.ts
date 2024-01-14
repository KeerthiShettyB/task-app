import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],      
    description: [''],                     
    dueDate: ['', Validators.required],    
    status: ['', Validators.required],    
  });
  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) {}

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.router.navigate(['/tasks']);
    }
  }
}
