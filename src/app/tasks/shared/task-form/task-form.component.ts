import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Task } from '../task.model';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
    selector: 'task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
    @Input() actionToPerform: string;
    @Input() task: Task;
    @Output() taskUpdated = new EventEmitter();

    private prioritySlider = {
        max: 3,
        min: 1,
        step: 1
    };

    private frequencyList = [
        { value: 'once', viewValue: 'Una tantum' },
        { value: 'daily', viewValue: 'Giornaliero' },
        { value: 'weekly', viewValue: 'Settimanale' },
        { value: 'monthly', viewValue: 'Mensile' }
    ];

    /*ngOnInit(): void {

    };*/

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
        this.actionToPerform = this.actionToPerform ? this.actionToPerform : 'create';
        this.task = this.task ? this.task : new Task();
    }

    createTask(): void {
        this.taskUpdated.emit({ actiontoPerform: 'create', task: this.task });
    }

    updateTask(): void {
        this.taskUpdated.emit({ actiontoPerform: 'update', task: this.task });
    }
    cancelEdit(): void {
        this.actionToPerform = 'create';
        this.task = new Task();
    }
}
