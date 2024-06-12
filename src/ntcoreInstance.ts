import { NetworkTables } from "ntcore-ts-client";

export const photonvisionStream = "https://i.imgur.com/hEAVye5.png";
export let ntcore = NetworkTables.getInstanceByURI("127.0.0.1");

export const setConnectionByTeamNumber = (teamNumber: number) => {
    ntcore = NetworkTables.getInstanceByTeam(teamNumber);
};

export const setConnectionByURI = (uri: string) => {
    ntcore = NetworkTables.getInstanceByURI(uri);
}