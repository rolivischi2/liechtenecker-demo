import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from './model/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private players = new BehaviorSubject<Player[]>([
    {name: 'Anna'},
    {name: 'Lisa'},
    {name: 'Maria'},
    {name: 'Alexandra'},
    {name: 'Johannes'},
    {name: 'Thomas'},
    {name: 'Werner'},
    {name: 'Lukas'}
]);

  constructor() { }

  setPlayers(players: Player[]): void {
    this.players.next(players);
  }

  clearPlayers(): void {
    this.players.next([]);
  }

  getPlayers(): Observable<Player[]> {
    return this.players.asObservable();
  }

}
