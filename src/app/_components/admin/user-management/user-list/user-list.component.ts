import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../../../_models/user';
import { AdminUserService } from '../../../../_services/adminServices/adminUser.service'
import { AlertService } from 'src/app/_services';
import {PageEvent} from '@angular/material/paginator';
import { trigger, state, transition, animate, style } from '@angular/animations';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserListComponent implements OnInit {
  
  public users: User[];
  public totalUsers: number;
  private _currentPage: number=1;
 private _currentSearchValue: string = '';
  private _pageSize: number=10;
  public loading = false;
  panelOpenState = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  columnsToDisplay = ['fullname','email', 'method','Action'];
  expandedElement: User | null;
  // MatPaginator Output
  // pageEvent: PageEvent;

  

  // usersChanged = new EventEmitter<User[]>();
  
  
  constructor( private adminUserService:AdminUserService,
    private alertService:AlertService) { }
  
  ngOnInit() {

    this._loadUsers(
      this._currentPage,
      this._pageSize,
      this._currentSearchValue
    );


    //  this.adminUserService.getAllUsers().subscribe(users=>{
    //    this.users=users;
    //  })
    // ;

  }

  public filterList(searchParam: string): void {
    this._currentSearchValue = searchParam;
    this._loadUsers(
      this._currentPage,
      this._pageSize,
      this._currentSearchValue
    );
  }
  
  public goToPage(pageEvent:PageEvent){

    this._currentPage = pageEvent.pageIndex+1;
    this._pageSize = pageEvent.pageSize;
    
    
    this._loadUsers(
      this._currentPage,
      this._pageSize,
      this._currentSearchValue
    );
  }
  private _loadUsers(
    page: number,pageSize:number, searchParam: string 
  ) {
    this.loading = true;
    this.adminUserService.getAllUsers(
      page,pageSize, searchParam
    ).subscribe((response) => {
      this.users = response.userlist;
    this.totalUsers = response.count;
    this.loading =false;  
  }, (error) =>
    this.alertService.error(error)
     );
  }




}
