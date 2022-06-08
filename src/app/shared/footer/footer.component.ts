import { Component, OnInit } from '@angular/core';
import { NavFootService } from 'src/app/services/nav-foot.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(public nav: NavFootService) { }
  today = new Date().toLocaleString("en-IN");

  ngOnInit(): void {
    setInterval(() => { this.today }, 1000) //TODO fix timer
  }
}
