import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { UtilsService } from '../../shared/utils.service';

@Injectable()
export class TaskUtilsService {
    constructor(
        private utils: UtilsService
    ) {};
    public filterTasks(tasks: Task[], filters: string[]): Task[] {
        if (!filters) {
            return tasks;
        }
        let tasksCopy: Task[] = tasks.slice();
        for (let filter of filters) {
            tasksCopy = tasksCopy.filter(task => {
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
        };
        return tasksCopy;
    };

    public dashboardFilter(task: Task, range: number = 7): boolean {
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
    public todoFilter(task: Task): boolean {
        switch (task['frequency']) {
            case 'once':
                return task['doneDate'] === null ? true : false;
            case 'daily':
                return task['doneDate'] === null ? true : Math.abs(this.utils.dateDiff(task['doneDate'], new Date())) > 0;
            case 'weekly':
                let weekday: number = task['taskDate'].getDay();
                if (new Date().getDay() == weekday)
                    return task['doneDate'] === null ? true : Math.abs(this.utils.dateDiff(task['doneDate'], new Date())) > 0;
                return false;
            case 'monthly':
                let monthday: number = task['taskDate'].getDate();
                if (new Date().getDate() == monthday)
                    return task['doneDate'] === null ? true : Math.abs(this.utils.dateDiff(task['doneDate'], new Date())) > 0;
                return false;
        };
    };
    public orderTasksBy(property: string): any {
        var sortOrder: number = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function(a, b): number {
            var result: number;
            if (typeof a[property] === 'string')
                result = a[property].toLowerCase().localeCompare(b[property].toLowerCase());
            else
                result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };

}
