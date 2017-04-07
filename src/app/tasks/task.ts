export class Task {
    _id ? : string;
    owner: string;
    description: string;
    frequency ? : string;
    taskDate ? : Date;
    priority ? : number;
    doneDate ? : Date;
}

export function orderTasksBy(property: string) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
