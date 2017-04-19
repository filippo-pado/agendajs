import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Task } from '../shared/task.model';
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
    tables = [
        { title: 'Da fare', filter: 'todo', buttonIcon: 'check', tableIcon: 'assignment' },
        { title: 'Completati', filter: 'done', buttonIcon: 'clear', tableIcon: 'playlist_add_check' }
    ];
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
    };
    getTasks(): void {
        this.taskService
            .getTasks()
            .then(tasks => this.tasks = tasks.sort(Task.orderTasksBy('description')));
    };
    createTask(task: Task): void {
        if (task.description.trim() != '') {
            this.taskService
                .create(task)
                .then(resTask => {
                    //update dashboard
                    this.tasks.push(resTask);
                    this.tasks.sort(Task.orderTasksBy('description'));
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
                        this.tasks[idx] = resTask;
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
    };
    editTask(task: Task): void {
        this.taskForm.actionToPerform = 'update';
        this.taskForm.task = Object.assign(new Task(), task);
    };
    checkTask(task: Task): void {
        console.log('TODO: check task ' + task.description);
    };
    private getIndexOfTask: any = (taskID: String) => {
        return this.tasks.findIndex((task) => {
            return task._id === taskID;
        });
    };
}
