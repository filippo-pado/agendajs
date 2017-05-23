import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpClientService } from '../../shared/auth/http-client.service';
import { Task } from './task.model';

@Injectable()
export class TaskService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private tasksUrl = '/api/tasks'; // URL to web api

    constructor(private http: HttpClientService) {}

    getTasks(): Promise < Task[] > {
        return this.http.get(this.tasksUrl)
            .toPromise()
            .then(response => {
                return this.deserializeTasks(response.json()) as Task[]
            })
            .catch(this.handleError);
    };
    getTask(id: string): Promise < Task > {
        const url = `${this.tasksUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.deserializeTask(response.json()) as Task)
            .catch(this.handleError);
    };

    delete(id: string): Promise < void > {
        const url = `${this.tasksUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    };

    create(task: Task): Promise < Task > {
        return this.http
            .post(this.tasksUrl, JSON.stringify(task), { headers: this.headers })
            .toPromise()
            .then(res => this.deserializeTask(res.json()) as Task)
            .catch(this.handleError);
    };

    update(id: string, updates: any): Promise < Task > {
        const url = `${this.tasksUrl}/${id}`;
        return this.http
            .put(url, JSON.stringify(updates), { headers: this.headers })
            .toPromise()
            .then(res => this.deserializeTask(res.json()) as Task)
            .catch(this.handleError);
    };
    public deserializeTasks(tasks: Task[]): Task[] {
        return tasks.map(this.deserializeTask);
    }
    public deserializeTask(task: Task): Task {
        task['taskDate'] = (task['taskDate'] instanceof Date) ? task['taskDate'] : new Date(task['taskDate']);
        task['doneDate'] = (task['doneDate'] instanceof Date) ? task['doneDate'] : (task['doneDate'] === null ? null : new Date(task['doneDate']));
        return task;
    }
    private handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error);
    };
}
