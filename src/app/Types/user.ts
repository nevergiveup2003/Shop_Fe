export interface IUser{
    id:number;
    name:string;
    email:string;
    gender:Gender;
    phone:string;
    status:string;
    dateofbirth:string;
}
export enum Gender {
    Male = 1,
    Female = 2,
}