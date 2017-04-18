import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Task, orderTasksBy } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    taskForm = { actionToPerform: 'create', task: new Task() };
    tasks: Task[] = [];
    orderField: string = 'description';
    frequencyMap = { 'once': 'Una tantum', 'daily': 'Giornaliero', 'weekly': 'Settimanale', 'monthly': 'Mensile' };

    constructor(
        private taskService: TaskService,
        public messageBar: MdSnackBar
    ) {};

    ngOnInit(): void {
        this.getTasks();
    };

    taskUpdated(event: any): void {
        switch (event.button) {
            case 'create':
                this.createTask(event.task);
                break;
            case 'update':
                this.updateTask(event.task);
                break;
            case 'cancel':
                this.resetForm();
                break;
        }
    }


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
                    //update dashboard
                    this.tasks.push(this.prepareTask(resTask));
                    this.tasks.sort(orderTasksBy('description'));
                    //update form                    
                    this.resetForm();
                    //notify user
                    this.messageBar.open('Impegno creato!', 'OK', { duration: 2000 });
                });
        }
    };
    deleteTask(task: Task): void {
        this.taskService
            .delete(task._id)
            .then(() => {
                //update dashboard
                this.tasks = this.tasks.filter(t => t !== task);
                //update form if needed
                if (this.taskForm.task._id === task._id)
                    this.resetForm();
                //notify user
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
                        //update dashboard
                        this.tasks[idx] = this.prepareTask(resTask);
                        //update form                    
                        this.resetForm();
                        //notify user
                        this.messageBar.open('Impegno modificato!', 'OK', { duration: 2000 });
                    }
                });
        }
    };
    resetForm(): void {
        this.taskForm.actionToPerform = 'create';
        this.taskForm.task = new Task();
    }
    editTask(task: Task): void {
        this.taskForm.task = Object.assign(new Task(), task);
        this.taskForm.actionToPerform = 'update';
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
