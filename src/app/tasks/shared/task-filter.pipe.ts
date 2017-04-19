import { PipeTransform, Pipe } from '@angular/core';
import { Task } from './task.model';
import { UtilsService } from '../../shared/utils.service';

@Pipe({
    name: 'taskFilter',
    pure: false
})
export class TaskFilterPipe implements PipeTransform {
    constructor(
        private utils: UtilsService
    ) {};
    public transform(tasks: Task[], filter: string): Task[] {
        if (!tasks || !filter) {
            return tasks;
        }
        return tasks.filter(task => {
            switch (filter) {
                case 'dashboard':
                    return this.dashboardFilter(task);
                case 'todo':
                    return this.todoFilter(task);
                case 'done':
                    return !this.todoFilter(task);
                default:
                    return true;
            }
        });
    }

    private dashboardFilter(task: Task): boolean {
        let range: number = 7; //7 days to show in dashboard
        switch (task['frequency']) {
            case 'once':
                return (this.utils.dateDiff(task['taskDate'], new Date()) < range);
            case 'daily':
                return true;
            case 'weekly':
                return true;
            case 'monthly':
                let monthday: number = task['taskDate'].getDate();
                return Math.abs(new Date().getDate() - monthday) < range;
        };
    };
    private todoFilter(task: Task): boolean {
        switch (task['frequency']) {
            case 'once':
                return task['doneDate'] === null ? true : false;
            case 'daily':
                return task['doneDate'] === null ? true : this.utils.dateDiff(task['doneDate'], new Date()) > 0;
            case 'weekly':
                let weekday: number = task['taskDate'].getDay();
                if (new Date().getDay() == weekday)
                    return task['doneDate'] === null ? true : this.utils.dateDiff(task['doneDate'], new Date()) > 0;
                return false;
            case 'monthly':
                let monthday: number = task['taskDate'].getDate();
                if (new Date().getDate() == monthday)
                    return task['doneDate'] === null ? true : this.utils.dateDiff(task['doneDate'], new Date()) > 0;
                return false;
        };
    };
}
