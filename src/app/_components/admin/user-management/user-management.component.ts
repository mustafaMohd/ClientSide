import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../../_models/user';
import { AdminUserService, UserQuery } from '../../../_services/adminServices/adminUser.service'
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { AlertService } from 'src/app/_services';
import { Subject } from 'rxjs';
//import { PaginatedDataSource } from 'src/app/_services/pagination/paginated-datasource';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  public users: User[];

  public totalUsers: number;
  private _currentPage: number;
  private _currentSearchValue: string = '';
  public _pageSize: number=15;;
  public loading = false;
  

   //userChange = new EventEmitter();
  
   userSubject:Subject<User> = new Subject();

   //selectedUser = new EventEmitter();

  selectedUser: User;
  selectedUsers:User[];
  newUser: boolean;
  displayNewDialog: boolean;
  displayEditDialog: boolean;
  displayChangePasswordDialog: boolean;
  
  // Users: User[];

  //cols: any[];
  
  //  cols = [ 'fullname','email','method','roles','actions'];

  cols =[
    { field: 'fullname', header: 'Fullname' },
    { field: 'email', header: 'Email' },
    { field: 'method', header: 'Method' },
    ];

   //   dataSource = new PaginatedDataSource<User, UserQuery>(
//     (request, query) => this.adminUserService.page( request, query ),
//     {property: 'fullname', order: 'desc'},
//     {search: '', createdAt: undefined}
// )


  //public dataSource = new MatTableDataSource();
  
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  
  constructor(private adminUserService: AdminUserService,private alertService:AlertService) { 
   
  }

   ngOnInit() {
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
  

  showDialogToAdd() {
    // this.newUser = true;
    // this.user = new User;
  this.displayEditDialog= false;
  this.displayChangePasswordDialog= false;
  this.displayNewDialog = true;

}
showDialogToEdit(u) {
  // this.newUser = true;
  // this.user = new User;
this.userSubject.next(u);
  this.displayNewDialog = false;
  this.displayChangePasswordDialog= false;
  this.displayEditDialog= true;

}
showDialogToChangePassword(u) {
  // this.newUser = true;
  // this.user = new User;
this.userSubject.next(u);

this.displayEditDialog= false;
  this.displayNewDialog = false;
  this.displayChangePasswordDialog= true;

}


onDialogClose(event) {
  this.displayEditDialog= event;
  this.displayNewDialog = event;
  this.displayEditDialog = event;

}



// save() {
//   let users = [...this.users];
//   if (this.newUser)
//   users.push(this.user);
//   else
//   users[this.users.indexOf(this.selectedUser)] = this.user;

//   this.users = users;
//   this.user = null;
//   this.displayNewDialog = false;
// }

// delete() {
//   let index = this.users.indexOf(this.selectedUser);
//   this.users = this.users.filter((val, i) => i != index);
//   this.user = null;
//   this.displayNewDialog = false;
// }
EditUser(u) {
 
this.selectedUser = this.cloneUser(u);
    
this.displayNewDialog = false;
  
  this.displayEditDialog= true;

}


onRowUnselect(event) {
  //this.messageService.add({severity:'info', summary:'Car Unselected', detail:'Vin: ' + event.data.vin});
}

onRowSelect(event) {
  //this.user = this.cloneUser(event.data);
  // this.displayNewDialog = false;
  // this.displayEditDialog= true;



}

cloneUser(u: User): User {
  let user = new User;
  for (let prop in u) {
    user[prop] = u[prop];
  }
  return user;
}




}



  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }
  
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // public doFilter = (value: string) => {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  // }

//}
