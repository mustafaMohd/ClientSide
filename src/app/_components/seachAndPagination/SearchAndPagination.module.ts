import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SharedModule } from '../shared/SharedModule.module';
 
 
@NgModule({
  
  declarations: [
    PaginationComponent,
    SearchInputComponent
      
  ],
  imports: [
    CommonModule,
    SharedModule,
  
    ],
  
  exports: [
   PaginationComponent,
  SearchInputComponent
    
  ]
  
 
})
export class SearchAndPaginationModule  { }
