import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() { }
  today = new Date().toLocaleString("en-IN");

  ngOnInit(): void {
    setInterval(() => { this.today }, 1000) //TODO fix timer
  }
}
