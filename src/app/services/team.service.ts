import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
import { Team } from '../models/team.model';
import {TeamInputDto} from '../home/dtos/team-input.dto';

@Injectable()
export class TeamService {

  static END_POINT = '/team';
  static END_POINT_DELETE_DB = '/db/delete';

  constructor(private httpService: HttpService) {
  }

  create(team: Team): Observable<any> {
    return this.httpService.successful().post(TeamService.END_POINT, team);
  }

  getAll(): Observable<TeamInputDto[]> {
    return this.httpService.get(TeamService.END_POINT);
  }

  delete(): Observable<any> {
    return this.httpService.delete(TeamService.END_POINT_DELETE_DB);
  }

  update(team: Team): Observable<any> {
    return this.httpService.successful().put(TeamService.END_POINT + '/' + team.getCode(), team);
  }

  getByCode(code: string): Observable<TeamInputDto[]> {
    return this.httpService.get(TeamService.END_POINT + '/' + code);
  }
}
