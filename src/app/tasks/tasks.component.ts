import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'my-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks: Task[];
    selectedTask: Task;
    frequency: string = 'once';
    priority: number = 2;

    prioritySlider = {
        max: 3,
        min: 1,
        step: 1
    };

    frequencyList = [
        { value: 'once', viewValue: 'Una tantum' },
        { value: 'daily', viewValue: 'Giornaliero' },
        { value: 'weekly', viewValue: 'Settimanale' },
        { value: 'monthly', viewValue: 'Mensile' }
    ];

    constructor(
        private taskService: TaskService,
        //private router: Router
    ) {};

    getTasks(): void {
        this.taskService
            .getTasks()
            .then(tasks => this.tasks = tasks);
    };

    add(): void {
        //input fields
        let task = { owner: 'John', description: 'Test angular', };
        this.taskService.create(task)
            .then(task => {
                this.tasks.push(task);
                this.selectedTask = null;
            });
    };

    delete(task: Task): void {
        this.taskService
            .delete(task._id)
            .then(() => {
                this.tasks = this.tasks.filter(t => t !== task);
                if (this.selectedTask === task) { this.selectedTask = null; }
            });
    };

    ngOnInit(): void {
        this.getTasks();
    };
    onSelect(task: Task): void {
        this.selectedTask = task;
    };

    /* gotoDetail(): void {
          this.router.navigate(['/detail', this.selectedHero.id]);
      }*/
}
