import { Component } from '@angular/core';

import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'fc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  public showLoading!: boolean;

  constructor(
    private readonly _loadingService: LoadingService,
  ) { }

  public ngOnInit(): void {
    this._loadingService.event$.subscribe((event) => this.showLoading = event);
  }

}
