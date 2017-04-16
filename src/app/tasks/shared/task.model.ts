export class Task {
    _id ? : string;
    owner: string;
    description: string;
    frequency ? : string;
    taskDate ? : Date;
    priority ? : number;
    doneDate ? : Date;
    todo ? : boolean;
    constructor(owner: string = 'nobody') {
        this.owner = owner;
        this.description = '';
        this.frequency = 'once';
        this.taskDate = new Date();
        this.priority = 2;
    }
}

export function orderTasksBy(property: string) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result: number;
        if (typeof a[property] === 'string')
            result = a[property].toLowerCase().localeCompare(b[property].toLowerCase());
        else
            result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
