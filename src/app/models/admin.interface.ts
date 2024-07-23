export interface adminInterface {
    _id : string
    fullName : string
    email : string
    phone : number
    Admin : {
        View : boolean
        Add : boolean
        Edit : boolean
        Delete : boolean
    }
    Course : {
        View : boolean
        Add : boolean
        Edit : boolean
        Delete : boolean
    }
    Batch : {
        View : boolean
        Add : boolean
        Edit : boolean
        Delete : boolean
    }
    Students : {
        View : boolean
        Add : boolean
        Edit : boolean
        Delete : boolean
    },
    createdAt : Date | number,
    updatedAt : Date | number,
}