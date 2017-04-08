import { Component, Input } from '@angular/core';

import { Task, orderTasksBy } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent{
	@Input()
	task: Task
	@Input()
	createHandler: Function;
	@Input()
	updateHandler: Function;
	@Input()
	deleteHandler: Function;	
    
    /*frequency: string = 'once';
    priority: number = 2;
    taskDate: Date = new Date();*/
    
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

    createTask(task: Task) {
		this.createHandler(task);
	}

	updateTask(task: Task): void {
		this.updateHandler(task);
	}

	deleteTask(task: Task): void {
		this.deleteHandler(task);
	}
    
}
