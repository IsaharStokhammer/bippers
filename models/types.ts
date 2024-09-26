export interface Beeper {
    id : string,
    name : string,
    status : Status,
    createTime : Date,
    explosionTime? : Date,
    lonPoint? : Number,
    latPoint? : Number
}
export enum Status {
    manufactured = 1, 
    assembled = 2, 
    shipped = 3, 
    deployed = 4,
    detonated = 5
  }