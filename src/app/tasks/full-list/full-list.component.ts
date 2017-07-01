import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { TaskUtilsService } from '../shared/task-utils.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'full-list',
    templateUrl: './full-list.component.html',
    styleUrls: ['./full-list.component.css']
})
export class FullListComponent implements OnInit {
    taskForm: Subject < Task > = new Subject < Task > ();
    orderField: string = 'description';
    frequencyMap = { 'once': 'Una tantum', 'daily': 'Giornaliero', 'weekly': 'Settimanale', 'monthly': 'Mensile' };

    taskLists: any = { 'todo': [], 'done': [] };
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
        this.taskService
            .getTasks()
            .then(tasks => {
                this.taskLists['todo'] = tasks;
                this.taskLists['done'] = tasks;
                this.updateLists();
            });
    };
    taskCreated(task: Task): void {
        //update lists
        this.taskLists['todo'].push(task);
        this.taskLists['done'].push(task);
        this.updateLists();
        //notify user
        this.messageBar.open('Impegno: ' + task.description + ', creato!', 'OK', { duration: 2000 });
    };
    taskUpdated(task: Task): void {
        let idx = this.getIndexOfTask(this.taskLists['todo'], task._id);
        if (idx !== -1) this.taskLists['todo'][idx] = task;
        idx = this.getIndexOfTask(this.taskLists['done'], task._id);
        if (idx !== -1) this.taskLists['done'][idx] = task;
        this.updateLists();
        //notify user
        this.messageBar.open('Impegno: ' + task.description + ', modificato!', 'OK', { duration: 2000 });
    };
    deleteTask(task: Task): void {
        this.taskService
            .delete(task._id)
            .then(() => {
                //update lists
                this.taskLists['todo'] = this.taskLists['todo'].filter(t => t !== task);
                this.taskLists['done'] = this.taskLists['done'].filter(t => t !== task);
                //update form if needed
                this.taskForm.next(null);
                //notify user
                this.messageBar.open('Impegno: ' + task.description + ', eliminato!', 'OK', { duration: 2000 });
            });
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
