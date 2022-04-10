import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Element } from '../model/element.model';

// export function getElements() {
//   return [];
// }


@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // public getInfo(URL: string): Observable<any> {
  //   return this.http.get( URL )
  //     .pipe(
  //       map(data => {}))
  //     .subscribe(result => )
  // }

  private formatElementsArray(response: any): Element[] {
    const elements: Element[] = [];
    return response.map(item => {
      elements.push({   atomicNumber: item.atomicNumber,
        symbol: item.symbol,
        name: item.name,
        atomicMass: item.atomicMass,
        cPKHexColor: item.cPKHexColor,
        electronConfiguration: item.electronConfiguration,
        electronegativity: item.electronegativity,
        atomicRadius: item.atomicRadius,
        ionizationEnergy: item.ionizationEnergy,
        electronAffinity: item.electronAffinity,
        oxidationStates: item.oxidationStates,
        standardState: item.standardState,
        meltingPoint: item.meltingPoint,
        boilingPoint: item.boilingPoint,
        density: item.density,
        groupBlock: item.groupBlock,
        tablePosition: item.tablePosition,
        yearDiscovered: item.yearDiscovered });
    });
  }

  public getElements(): any {
    return this.http.get(`${this.host}/elements/list`)
      // .subscribe(response => console.log("response from getElements: \n" + response));
  }
}
