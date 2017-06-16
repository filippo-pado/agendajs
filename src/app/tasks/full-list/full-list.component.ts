import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { TaskUtilsService } from '../shared/task-utils.service';

@Component({
    selector: 'full-list',
    templateUrl: './full-list.component.html',
    styleUrls: ['./full-list.component.css']
})
export class FullListComponent implements OnInit {
    checked: boolean = true;
    showFull: boolean = false;
    showToggle() {
        this.showFull = !this.showFull;
    }

    taskForm = { actionToPerform: 'create', task: new Task() };
    taskLists: any = { 'todo': [], 'done': [] };
    orderField: string = 'description';
    frequencyMap = { 'once': 'Una tantum', 'daily': 'Giornaliero', 'weekly': 'Settimanale', 'monthly': 'Mensile' };
    lists = [
        { title: 'Da fare', list: 'todo' },
        { title: 'Completati', list: 'done' }
    ];
    constructor(
        private taskService: TaskService,
        private messageBar: MdSnackBar,
        private taskUtilsService: TaskUtilsService
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
            .then(tasks => {
                this.taskLists['todo'] = tasks;
                this.taskLists['done'] = tasks;
                this.updateLists();
            });
    };
    createTask(task: Task): void {
        if (task.description.trim() != '') {
            this.taskService
                .create(task)
                .then(resTask => {
                    //update lists
                    this.taskLists['todo'].push(resTask);
                    this.taskLists['done'].push(resTask);
                    this.updateLists();
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
                //update lists
                this.taskLists['todo'] = this.taskLists['todo'].filter(t => t !== task);
                this.taskLists['done'] = this.taskLists['done'].filter(t => t !== task);
                //update form if needed
                if (this.taskForm.task._id === task._id)
                    this.resetForm();
                //notify user
                this.messageBar.open('Impegno: ' + task.description + ', eliminato!', 'OK', { duration: 2000 });
            });
    };
    updateTask(task: Task): void {
        if (task.description.trim() != '') {
            this.taskService
                .update(task._id, task)
                .then((resTask) => {
                    //update list
                    let idx = this.getIndexOfTask(this.taskLists['todo'], resTask._id);
                    if (idx !== -1) this.taskLists['todo'][idx] = resTask;
                    idx = this.getIndexOfTask(this.taskLists['done'], resTask._id);
                    if (idx !== -1) this.taskLists['done'][idx] = resTask;
                    this.updateLists();
                    //update form                    
                    this.resetForm();
                    //notify user
                    this.messageBar.open('Impegno modificato!', 'OK', { duration: 2000 });
                });
        }
    };
    checkTask(task: Task): void {
        this.taskService
            .update(task._id, { doneDate: new Date() })
            .then((resTask) => {
                //update 
                this.switchList(resTask);
                this.updateLists();
                //notify user
                this.messageBar.open('Impegno: ' + resTask.description + ', fatto!', 'OK', { duration: 2000 });
            });
    };
    uncheckTask(task: Task): void {
        this.taskService
            .update(task._id, { doneDate: null })
            .then((resTask) => {
                this.switchList(resTask);
                this.updateLists();
                //notify user
                this.messageBar.open('Impegno: ' + resTask.description + ', da fare!', 'OK', { duration: 2000 });
            });
    };
    resetForm(): void {
        this.taskForm.actionToPerform = 'create';
        this.taskForm.task = new Task();
    };
    editTask(task: Task): void {
        this.taskForm.actionToPerform = 'update';
        this.taskForm.task = Object.assign(new Task(), task);
    };
    private switchList(resTask: Task): void {
        let idx = this.getIndexOfTask(this.taskLists['todo'], resTask._id);
        if (idx !== -1) {
            this.taskLists['todo'].splice(idx, 1);
            this.taskLists['done'].push(resTask);
        } else {
            idx = this.getIndexOfTask(this.taskLists['done'], resTask._id);
            if (idx !== -1) {
                this.taskLists['done'].splice(idx, 1);
                this.taskLists['todo'].push(resTask);
            }
        }
    }
    private updateLists(): void {
        this.taskLists['todo'] = this.taskUtilsService.filterTasks(this.taskLists['todo'], ['todo']).sort(this.taskUtilsService.orderTasksBy('description'));
        this.taskLists['done'] = this.taskUtilsService.filterTasks(this.taskLists['done'], ['done']).sort(this.taskUtilsService.orderTasksBy('description'));
    };
    private getIndexOfTask: any = (taskList: Task[], taskID: String) => {
        return taskList.findIndex((task) => {
            return task._id === taskID;
        });
    };
}
