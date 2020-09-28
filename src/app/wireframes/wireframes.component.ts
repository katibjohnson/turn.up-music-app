import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wireframes',
  templateUrl: './wireframes.component.html',
  styleUrls: ['./wireframes.component.css'],
})
export class WireframesComponent implements OnInit {
  pdfSrc = 'assets/Turn.up Wireframes.pdf';
  constructor() {}

  ngOnInit(): void {}
}
