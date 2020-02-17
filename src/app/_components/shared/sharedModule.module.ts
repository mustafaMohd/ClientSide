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
  import { FlexLayoutModule } from '@angular/flex-layout';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  //import { SearchAndPaginationModule } from '../seachAndPagination/SearchAndPagination.module';

  @NgModule({
      imports: [MatToolbarModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatInputModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule,MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule,MatChipsModule,
         FormsModule,ReactiveFormsModule,MatPaginatorModule,
         MatSortModule,MatTableModule,MatDatepickerModule,MatNativeDateModule,MatExpansionModule  
       ],
      exports: [ MatToolbarModule, MatMenuModule,
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
