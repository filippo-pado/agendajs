import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
    selector: 'task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
    @Input() taskObserver: Observable < Task > ;
    @Output() taskUpdated = new EventEmitter();
    @Output() taskCreated = new EventEmitter();

    task: Task = new Task();
    actionToPerform: string = 'create';

    priorityList = [
        { value: 1, viewValue: 'Bassa' },
        { value: 2, viewValue: 'Media' },
        { value: 3, viewValue: 'Alta' }
    ];

    frequencyList = [
        { value: 'once', viewValue: 'Una tantum' },
        { value: 'daily', viewValue: 'Giornaliero' },
        { value: 'weekly', viewValue: 'Settimanale' },
        { value: 'monthly', viewValue: 'Mensile' }
    ];

    constructor(
        private taskService: TaskService,
    ) {};

    ngOnInit(): void {
        this.taskObserver.subscribe((taskToUpdate: Task) => {
            if (taskToUpdate != null) {
                this.task = Object.assign({}, taskToUpdate);
                this.actionToPerform = 'update';
            } else {
                this.reset();
            }
        });
    };
    createTask(): void {
        if (this.task.description.trim() != '') {
            this.taskService
                .create(this.task)
                .then(resTask => {
                    this.taskCreated.emit(resTask);
                    this.reset();
                });
        }
    }
    updateTask(): void {
        if (this.task.description.trim() != '') {
            this.taskService
                .update(this.task._id, this.task)
                .then((resTask) => {
                    this.taskUpdated.emit(resTask);
                    this.reset();
                });
        }
    }
    cancelUpdate(): void {
        this.reset();
    }
    private reset(): void {
        this.task = new Task();
        this.actionToPerform = 'create';
    }
}
