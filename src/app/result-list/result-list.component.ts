import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  @Input() list: any;

  constructor() {}

  ngOnInit(): void {}
}
