import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Task, orderTasksBy } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    selectedTask: Task = new Task();
    orderField: string = 'description';
    actionToPerform: string = 'create';

    constructor(
        private taskService: TaskService,
        public messageBar: MdSnackBar
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
        if (task.description.trim() != '') {
            this.taskService
                .create(task)
                .then(resTask => {
                    this.tasks.push(resTask);
                    this.selectedTask = new Task();
                    this.actionToPerform = 'create';
                    this.messageBar.open('Impegno creato!', 'OK', { duration: 2000 });
                });
        }
    };

    deleteTask(task: Task): void {
        this.taskService
            .delete(task._id)
            .then(() => {
                this.tasks = this.tasks.filter(t => t !== task);
                if (this.selectedTask === task) { this.selectedTask = new Task(); }
                this.messageBar.open('Impegno eliminato!', 'OK', { duration: 2000 });
            });
    };
    updateTask(task: Task): void {
        if (task.description.trim() != '') {
            this.taskService
                .update(task)
                .then((resTask) => {
                    let idx = this.getIndexOfTask(resTask._id);
                    if (idx !== -1) {
                        this.tasks[idx] = resTask;
                    }
                    this.selectedTask = new Task();
                    this.actionToPerform = 'create';
                    this.messageBar.open('Impegno modificato!', 'OK', { duration: 2000 });
                });
        }
    };
    editTask(task: Task): void {
        this.selectedTask = task;
        this.actionToPerform = 'update';
    };
    checkTask(task: Task): void {
        console.log('TODO: check task ' + task.description);
    }
    private getIndexOfTask = (taskID: String) => {
        return this.tasks.findIndex((task) => {
            return task._id === taskID;
        });
    }

    private parseDate(task): Task {
        task['taskDate'] = new Date(task['taskDate']);
        task['doneDate'] = new Date(task['doneDate']);
        return task;
    }
}
