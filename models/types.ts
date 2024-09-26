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
    manufactured, //יוצר
    assembled, // הורכב
    shipped, //נשלח
    deployed,// נפרס בלבנון
    detonated//התפוצץ
  }