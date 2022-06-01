import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  ngOnInit() {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
}
