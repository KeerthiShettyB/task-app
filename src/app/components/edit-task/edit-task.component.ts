import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.taskId = +idParam;
      const existingTask = this.taskService.getTaskById(this.taskId);

      if (existingTask) {
        this.taskForm.patchValue(existingTask);
      } else {
        this.router.navigate(['/tasks']);
      }
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit() {
    if (this.taskForm.valid && this.taskId !== null) {
      const updatedTask = { ...this.taskForm.value, id: this.taskId };
      this.taskService.updateTask(updatedTask);
      this.router.navigate(['/tasks']);
    }
  }
}
