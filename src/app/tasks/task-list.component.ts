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
    tasks: Task[] = [];
    selectedTask: Task = null;
    orderField: string = 'description';

    constructor(
        private taskService: TaskService
    ) {};

    ngOnInit(): void {
        this.getTasks();
    };

    getTasks(): void {
        this.taskService
            .getTasks()
            .then(tasks => this.tasks = tasks.map(this.parseDate).sort(orderTasksBy('description')));
    };

    createTask(task: Task): void {
        this.taskService.create(task)
            .then(tasky => {
                this.tasks.push(task);
                this.selectedTask = task;
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
    selectTask(task: Task): void {
        this.selectedTask = task;
    };

    private parseDate(task): Task {
        task['taskDate'] = new Date(task['taskDate']);
        task['doneDate'] = new Date(task['doneDate']);
        return task;
    }
}
