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
    manufactured = 1, //יוצר
    assembled = 2, // הורכב
    shipped = 3, //נשלח
    deployed = 4,// נפרס בלבנון
    detonated = 5//התפוצץ
  }