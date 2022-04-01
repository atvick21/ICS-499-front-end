import { Injectable } from '@angular/core';

import { PeriodicTableModel } from "./periodic-table-model";


@Injectable()
export class PeriodicDataModelService {

  constructor() { }

  public getPeriodicTableDataModel(): PeriodicTableModel {
    return new PeriodicTableModel();
  }
}
