import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../task.model';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
    selector: 'task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
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

    createTask(): void {
        this.taskUpdated.emit({ button: 'create', task: this.task });
    };
    updateTask(): void {
        this.taskUpdated.emit({ button: 'update', task: this.task });
    };
    cancelEdit(): void {
        this.taskUpdated.emit({ button: 'cancel', task: this.task });
    };
}
