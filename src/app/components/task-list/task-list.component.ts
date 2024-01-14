
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; 

  constructor(private taskService: TaskService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  markAsCompleted(taskId: number) {
    this.taskService.markTaskAsCompleted(taskId);
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(taskId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this task?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(taskId);
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  editTask(taskId: number) {
    this.router.navigate(['/edit', taskId]);
  }

  showTaskDetails(taskId: number) {
    this.router.navigate(['/task-details', taskId]);
  }
}
