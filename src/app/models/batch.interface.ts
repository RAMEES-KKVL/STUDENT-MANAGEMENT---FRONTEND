export interface batchInterface {
    _id : string;
    batchName : string;
    startingDate : Date;
    strength ?: Array<string>;
    createdAt : number;
    updatedAt : number;
}