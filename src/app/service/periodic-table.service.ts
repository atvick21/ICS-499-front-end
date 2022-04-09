import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PeriodicTable } from '../model/periodic-table';

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getElements(): Observable<PeriodicTable[]> {
    return this.http.get<PeriodicTable[]>(`${this.host}/elements/list`);
  }
  
}
