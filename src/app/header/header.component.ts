import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
