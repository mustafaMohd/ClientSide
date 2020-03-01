import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() userId: number;
  
  constructor() { }

  ngOnInit() {
  }

}
