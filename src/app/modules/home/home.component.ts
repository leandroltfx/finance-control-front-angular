import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { RoutesEnum } from '../../shared/enum/routes.enum';

@Component({
  selector: 'fc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private readonly _router: Router,
  ) { }

  public goToBankAccounts(): void {
    this._router.navigate([RoutesEnum.BANK_ACCOUNTS]);
  }

  public goToMovements(): void {
    this._router.navigate([RoutesEnum.MOVEMENTS]);
  }

}
