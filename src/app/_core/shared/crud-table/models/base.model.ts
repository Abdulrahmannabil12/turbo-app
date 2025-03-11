export class BaseModel {
    id: any;
 
}
export class Base {
  Id: number;
  Active: boolean;
  IsDeleted: boolean;
  CreateDate: Date;
   constructor() {
      this.Id = 0;
      this.Active = false;
      this.IsDeleted = false;
      this.CreateDate = new Date();
  }
}
