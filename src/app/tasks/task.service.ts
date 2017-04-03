import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task';

@Injectable()
export class TaskService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private tasksUrl = '/api/tasks'; // URL to web api

    constructor(private http: Http) {}

    getTasks(): Promise < Task[] > {
        return this.http.get(this.tasksUrl)
            .toPromise()
            .then(response => response.json() as Task[])
            .catch(this.handleError);
    };
    getTask(id: string): Promise < Task > {
        const url = `${this.tasksUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Task)
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
            .then(res => res.json() as Task)
            .catch(this.handleError);
    };

    update(task: Task): Promise < Task > {
        const url = `${this.tasksUrl}/${task._id}`;
        return this.http
            .put(url, JSON.stringify(task), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Task)
            .catch(this.handleError);
    };

    private handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
}
