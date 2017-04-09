import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

import { Task, orderTasksBy } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    tasks: Task[];
    selectedTask: Task;    
    orderField = 'description';

    constructor(
        private taskService: TaskService,
        //private router: Router
    ) {};

	getTasks(): void {
        this.taskService
            .getTasks()            
			.then(tasks => this.tasks = tasks.map(this.parseDate).sort(orderTasksBy('description')) as Task[]);
    };

    createTask(): void { //Pass task
        //input fields //TODO
        let task = { owner: 'John', description: 'Test angular', };
        this.taskService.create(task)
            .then(task => {
                this.tasks.push(task);
                //this.selectedTask = task; //TODO
            });
    };

    deleteTask(task: Task): void {
        this.taskService
            .delete(task._id)
            .then(() => {
                this.tasks = this.tasks.filter(t => t !== task);
                if (this.selectedTask === task) { this.selectedTask = null; }
            });
    };
	updateTask(task: Task): void {
        /*this.taskService
            .delete(task._id)
            .then(() => {
                this.tasks = this.tasks.filter(t => t !== task);
                if (this.selectedTask === task) { this.selectedTask = null; }
            });*/
		//TODO
    };

    ngOnInit(): void {
        this.getTasks();
    };
    selectTask(task: Task): void {		
        this.selectedTask = task;
    };
	
	private parseDate(task): Task{
		task['taskDate']=new Date(task['taskDate']);
		task['doneDate']=new Date(task['doneDate']);
		return task;
	}
}
