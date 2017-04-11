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
    frequencyMap = { 'once': 'Una tantum', 'daily': 'Giornaliero', 'weekly': 'Settimanale', 'monthly': 'Mensile' };

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
            .then(tasks => this.tasks = tasks.map(this.prepareTask).sort(orderTasksBy('description')));
    };

    createTask(task: Task): void {
        if (task.description.trim() != '') {
            this.taskService
                .create(task)
                .then(resTask => {
                    this.tasks.push(this.prepareTask(resTask));
                    this.tasks.sort(orderTasksBy('description'));
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
                        this.tasks[idx] = this.prepareTask(resTask);
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
    todoTasks(task: Task) {
        return task.todo;
    }
    doneTasks(task: Task) {
        return !task.todo;
    }
    private getIndexOfTask = (taskID: String) => {
        return this.tasks.findIndex((task) => {
            return task._id === taskID;
        });
    }

    private prepareTask(task): Task {
        task['taskDate'] = (task['taskDate'] instanceof Date) ? task['taskDate'] : new Date(task['taskDate']);
        task['doneDate'] = (task['doneDate'] instanceof Date) ? task['doneDate'] : (task['doneDate'] === null ? null : new Date(task['doneDate']));
        switch (task['frequency']) {
            case 'once':
                task['todo'] = task['doneDate'] === null ? true : false;
                break;
            case 'daily':
                task['todo'] = task['doneDate'] === null ? true : dateDiff(task['doneDate'], new Date()) > 0;
                break;
            case 'weekly':
                let weekday: number = task['taskDate'].getDay();
                if (new Date().getDay() == weekday) {
                    task['todo'] = task['doneDate'] === null ? true : dateDiff(task['doneDate'], new Date()) > 0;
                } else
                    task['todo'] = false;
                break;
            case 'monthly':
                let monthday: number = task['taskDate'].getDate();
                if (new Date().getDate() == monthday) {
                    task['todo'] = task['doneDate'] === null ? true : dateDiff(task['doneDate'], new Date()) > 0;
                } else {
                    task['todo'] = false;
                }
                break;
        }
        return task;
    }

}

function dateDiff(d1: Date, d2: Date): number {
    let t2: number = d2.getTime();
    let t1: number = d1.getTime();
    return (t2 - t1) / (24 * 3600 * 1000);
};
