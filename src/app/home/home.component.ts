import {Component, OnInit} from '@angular/core';
import {InputDialogComponent} from './input-dialog.component';
import {MatDialog} from '@angular/material';
import {TeamService} from '../services/team.service';
import {TeamOutputDto} from './dtos/team-output-dto';
import {Team} from '../models/team.model';
import {TeamInputDto} from './dtos/team-input.dto';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  static URL = 'home';
  teams: TeamInputDto[] = [];

  constructor(public dialog: MatDialog, private teamService: TeamService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.newGame());
  }

  newGame() {
    this.teams = [];
    this.teamService.delete().subscribe();
    this.dialog.open(InputDialogComponent, {data: {name: [], teams: ['Primer equipo', 'Segundo equipo']}}).afterClosed().subscribe(
      result => {
        if (result) {
          const team: TeamOutputDto = {
            name: result
          };
          for (let i = 0; i < team.name.length; i++) {
            this.teamService.create(new Team(team.name[i])).subscribe();
          }
          for (let i = 0; i <= team.name.length; i++) {
            this.searchTeams().subscribe();
          }
        }
      }
    );
  }

  searchTeams(): Observable<any> {
    return new Observable(observer => {
      this.teamService.getAll().subscribe(units => {
        observer.next();
        for (let i = 0; i < units.length; i++) {
          this.teams.push(units[i]);
        }
        this.teams.splice(1, 1);
      });
    });
  }

  updateScore() {

  }
}
