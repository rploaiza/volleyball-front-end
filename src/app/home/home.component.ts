import {Component, OnInit} from '@angular/core';
import {InputDialogComponent} from './input-dialog.component';
import {MatDialog} from '@angular/material';
import {TeamService} from '../services/team.service';
import {TeamOutputDto} from './dtos/team-output-dto';
import {Team} from '../models/team.model';
import {TeamInputDto} from './dtos/team-input.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  static URL = 'home';
  sets: string[] = [];
  teamName: string[] = [];
  team: Team[] = [];

  constructor(public dialog: MatDialog, private teamService: TeamService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.newGame());
  }

  newGame() {
    this.team = [];
    this.sets = [];
    this.teamName = [];
    this.teamService.delete().subscribe();
    this.dialog.open(InputDialogComponent, {data: {name: [], teams: ['Primer equipo', 'Segundo equipo']}}).afterClosed().subscribe(
      result => {
        if (result) {
          const team: TeamOutputDto = {
            name: result
          };
          for (let i = 0; i < team.name.length; i++) {
            this.teamService.create(new Team(team.name[i])).subscribe(() =>
              this.teamService.getAll().subscribe(teams => {
                this.teamName.push(teams[i].name);
                this.team.push(new Team(teams[i].name, teams[i].code, teams[i].score));
              }));
          }
        }
      }
    );
  }

  updateScore(team: TeamInputDto) {
    const score = team.score + 1;
    if (score !== 25) {
      this.team = [];
      this.teamService.update(new Team('', team.code, score)).subscribe(() => {
        this.teamService.getAll().subscribe(teams => {
          for (let j = 0; j < teams.length; j++) {
            this.team.push(new Team(teams[j].name, teams[j].code, teams[j].score));
          }
        });
      });
    } else {
      this.sets.push(team.name);
      for (let i = 0; i < this.team.length; i++) {
        this.teamService.update(new Team('', team.code, 0)).subscribe( () =>
          this.team[i].setScore(0)
        );
      }
    }
  }
}
