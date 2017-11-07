import { Component } from '@angular/core';

import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MdcSnackbar
  ]
})
export class AppComponent {
  title = 'app';
}
