export class Task {
    _id ? : string;
    owner: string;
    description: string;
    frequency ? : string;
    taskDate ? : Date;
    priority ? : number;
    doneDate ? : Date;
    constructor(owner: string = 'nobody') {
        this.owner = owner;
        this.description = '';
        this.frequency = 'once';
        this.taskDate = new Date();
        this.priority = 2;
    };
};
