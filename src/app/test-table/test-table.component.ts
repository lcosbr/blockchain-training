import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {

  rows = [
    {name: '1', gender: 'male', company: 'a'},
    {name: '2', gender: 'male', company: 'b'},
    {name: '3', gender: 'male', company: 'c'},
  ];
  columns = [
    { prop: 'name' },
    { prop: 'gender' },
    { prop: 'company' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
