export interface ICertificate {
  ID: string;
  NAME: string;
  SUMMA: number;
  PRICE: number;
  DISCOUNT: number;
  TABLENAME: string;
  PRIMARYKEY: string;
}

export interface IUserData extends ICertificate {
  MsgText: string;
}
