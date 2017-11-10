import { Component } from '@angular/core';

import { MdcSnackbar } from '@angular-mdc/web';

import { LoadingService } from './tutorial/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MdcSnackbar
  ]
})
export class AppComponent {
  // isLoading: Boolean = false;

  title = 'app';

constructor(
  public loadingService: LoadingService
  ) { }

  // onLoading(event) {
  //   this.isLoading = event;
  // }
}
