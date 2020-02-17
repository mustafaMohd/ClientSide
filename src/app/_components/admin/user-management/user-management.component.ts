import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../../../_models/user';
import { AdminUserService, UserQuery } from '../../../_services/adminServices/adminUser.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
//import { PaginatedDataSource } from 'src/app/_services/pagination/paginated-datasource';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent   {
  //users: User[] = [];
 
   displayedColumns = ['email', 'fullname','createdAt', 'details', 'update', 'delete'
  ];
//   dataSource = new PaginatedDataSource<User, UserQuery>(
//     (request, query) => this.adminUserService.page( request, query ),
//     {property: 'fullname', order: 'desc'},
//     {search: '', createdAt: undefined}
// )


  //public dataSource = new MatTableDataSource();
  
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  
  constructor(private adminUserService: AdminUserService) { 
   
  }

  // ngOnInit() {
  //   this.adminUserService.getAll().subscribe(users => {
  //     this.dataSource = new MatTableDataSource(users);   
      
      // not implemented
      //this.users = users;
     // this.dataSource.data = users;
      
//    });;


  //}
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

}
