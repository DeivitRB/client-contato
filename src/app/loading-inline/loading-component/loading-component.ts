import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-inline',
  templateUrl: './loading-component.html',
  styleUrls: ['./loading-component.css'],
})
export class LoadingComponent implements OnInit {

    @Input() msgLoading = '';
    
  constructor() {}

  ngOnInit() {}
}
