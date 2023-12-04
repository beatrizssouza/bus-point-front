export type DataLines = {
  id?: number;
  nameLine: string;
  linesSchedules: Array<LinesSchedules>;
  pointIdList: Array<string>;
};

export type LinesSchedules = {
  hours: Array<string>;
  days: Array<string>;
};

export enum DAYS {
  DIA_UTEIS = "DIA_UTEIS",
  SABADO = "SABADO",
  DOMINGOEFERIADO = "DOMINGOEFERIADO",
}
