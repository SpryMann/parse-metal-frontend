export interface IAutoParsingSettings {
  isEnabled: boolean;
  timeMorning: number;
  timeEvening: number;
}

export interface ISettings {
  autoParsing: IAutoParsingSettings;
}
