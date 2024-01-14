import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: any;

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}

  ngOnInit() {
    const taskId = +this.route.snapshot.paramMap.get('id')!;

    if (isNaN(taskId)) {
      console.error(`Invalid task ID: ${this.route.snapshot.paramMap.get('id')}`);
    } else {
      this.task = this.taskService.getTaskById(taskId);
      if (!this.task) {
        console.error(`Task with ID ${taskId} not found`);
      }
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  getStatusClass(status: string): string {
    return status === 'complete' ? 'status-complete' : 'status-incomplete';
  }
}
