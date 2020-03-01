import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatInputModule,
    MatSidenavModule, MatGridListModule,
    MatSelectModule, MatDividerModule,MatChipsModule,
    MatIconModule, MatFormFieldModule, MatCardModule, 
    MatListModule, MatProgressBarModule,MatPaginatorModule,
    MatSortModule,MatTableModule, MatDatepickerModule, MatNativeDateModule,MatExpansionModule
  } from '@angular/material';
  //import {ButtonModule,AccordionModule} from 'primeng';
 import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
 import {ButtonModule} from 'primeng/button';     //accordion and accordion tab
 import {InputTextModule} from 'primeng/inputtext';
 import {TableModule} from 'primeng/table';
 import {PaginatorModule} from 'primeng/paginator';
 import {DialogModule} from 'primeng/dialog'
 //import {MenuItem} from 'primeng/api';                 //api
 
  
  import { FlexLayoutModule } from '@angular/flex-layout';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  //import { SearchAndPaginationModule } from '../seachAndPagination/SearchAndPagination.module';

  @NgModule({
      imports: [
        DialogModule,PaginatorModule,TableModule,ButtonModule,AccordionModule,InputTextModule,
        MatToolbarModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatInputModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule,MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule,MatChipsModule,
         FormsModule,ReactiveFormsModule,MatPaginatorModule,
  
         MatSortModule,MatTableModule,MatDatepickerModule,MatNativeDateModule,MatExpansionModule  
  
        ],
      exports: [
        DialogModule,PaginatorModule,TableModule,ButtonModule,AccordionModule,InputTextModule,
        MatToolbarModule, MatMenuModule,
        MatButtonModule, MatInputModule, MatIconModule,
       MatSidenavModule, MatGridListModule,MatChipsModule,
        MatSelectModule, MatDividerModule,MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule, 
         MatProgressBarModule,FlexLayoutModule,FormsModule,
         ReactiveFormsModule,MatPaginatorModule,
         MatSortModule,MatTableModule,MatDatepickerModule,MatNativeDateModule  ,MatExpansionModule  
      ]
  })
export class SharedModule {

}
