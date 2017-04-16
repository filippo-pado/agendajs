import { Component, Input } from '@angular/core';

import { Task, orderTasksBy } from '../task.model';
import { TaskService } from '../task.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
    @Input() task: Task;
    @Input() taskList: DashboardComponent;
    @Input() actionToPerform: string;

    prioritySlider = {
        max: 3,
        min: 1,
        step: 1
    };

    frequencyList = [
        { value: 'once', viewValue: 'Una tantum' },
        { value: 'daily', viewValue: 'Giornaliero' },
        { value: 'weekly', viewValue: 'Settimanale' },
        { value: 'monthly', viewValue: 'Mensile' }
    ];

    constructor(
        private taskService: TaskService,
    ) {};

    createTask(): void {
        this.taskList.createTask(this.task);
    }

    updateTask(): void {
        this.taskList.updateTask(this.task);
    }

    deleteTask(): void {
        this.taskList.deleteTask(this.task);
    }
}
