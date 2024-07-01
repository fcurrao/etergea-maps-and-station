
export interface data{
    name: number | null,
    state: string,
    id: number,
    gps1: number | null,
    gps2: number | null,
    gprs1: number | null,
    gprs2: number | null,
    bat: number | null,
    alim: boolean,
    batteryHigh: boolean,
    batteryLow: boolean,
    checked?: boolean;
}
 
