import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatInputModule,
    MatSidenavModule, MatGridListModule,
    MatSelectModule, MatDividerModule,MatChipsModule,
    MatIconModule, MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule
  } from '@angular/material';
  import { FlexLayoutModule } from '@angular/flex-layout';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  
  
  
  
  @NgModule({
      imports: [MatToolbarModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatInputModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule,MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule,MatChipsModule,
         FormsModule,ReactiveFormsModule
       ],
      exports: [ MatToolbarModule, MatMenuModule,
        MatButtonModule, MatInputModule, MatIconModule,
        MatSidenavModule, MatGridListModule,MatChipsModule,
        MatSelectModule, MatDividerModule,MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule,FormsModule,ReactiveFormsModule
      ]
  })
export class SharedModule {

}
