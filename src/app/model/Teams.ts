import { Player } from "./Player";

export interface Team {
    color: string;
    players: Player[];
    size: number;
}