import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Element } from '../model/element.model';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.host}/elements/list`);
  }
}
