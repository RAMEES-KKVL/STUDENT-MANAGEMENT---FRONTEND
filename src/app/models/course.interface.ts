export interface courseInterface {
    courseName : string;
    description : string;
    duration : number; 
    durationUnit : string
    createdAt : number;
    updatedAt : number;
    topics?: { [key: string]: string[] };
}