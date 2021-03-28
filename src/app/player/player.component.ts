import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Player } from '../model/Player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  playerCreationOpen = false;
  sub = new Subscription;
  players: Array<Player> = [];

  playerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });


  constructor(private playerService: PlayerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data=>this.players = data);
  }

  ngOnDestroy(): void {
    this.playerService.setPlayers(this.players);
    this.sub.unsubscribe();
  }

  togglePlayerCreation(): void{

    if(this.playerCreationOpen && this.playerForm.valid){

      const existing = this.players.find(player => player.name === this.playerForm.value.name.trim());

      if(existing){
        this.snackBar.open("Player already exists!");
        return;
      }
      this.players.push({name: this.playerForm.value.name.trim()});
      this.playerForm.reset();
    }
    this.playerCreationOpen = !this.playerCreationOpen;
  }

  isButtonDisabled(): boolean {
    return this.playerCreationOpen && this.playerForm.invalid;
  }

  removePlayer(player: Player): void {
    this.players = this.players.filter(player1 => player1.name !== player.name);
  }

  clearForm(): void {
    this.playerForm.reset();
    this.playerCreationOpen = false;
  }

}
