import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../model/Player';
import { Team } from '../model/Teams';
import { PlayerService } from '../player.service';
import 'lodash';
declare var _:any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  players: Player[] = [];
  teams: Team[] = [];
  selectedSize = 0;
  allowedSizes: number[] = [];
  constructor(private playerService: PlayerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data => {
      this.fillSizes(data.length);
      this.players = data;
    });
    console.log(this.players);
    console.log(this.allowedSizes);
  }

  fillSizes(playerCount: number): void {
    for(let i = 0; i <= Math.floor(playerCount/2); i++){
      if(playerCount % i === 0){
        this.allowedSizes.push(i);
      }
    }
  }

  getMaxSize(): number {
    return Math.floor(this.players.length/2);
  }

  isShuffleDisabled(): boolean {
    return this.allowedSizes.length < 1;
  }

  generateColor(): string {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
  }

  shuffleTeams(): void {
    if(this.selectedSize === 0){
      return;
    }
    this.teams = [];
    const teamCount = Math.floor(this.players.length / this.selectedSize);

    for(let i = 0; i < teamCount; i++){
      this.teams.push({players: [], size: 0, color: this.generateColor()});
    }

    let playerCopy = this.shuffle(this.players.slice());

    for(let player of playerCopy){
      for(let team of this.teams){
        if(team.size < this.selectedSize){
          team.players.push(player);
          team.size++;
          break;
        }
      }
    }
  }

  formatLabel(value: number){
    return value;
  }

  shuffle(a: Player[]): Player[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



}

