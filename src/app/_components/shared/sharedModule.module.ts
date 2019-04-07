import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatInputModule,
    MatSidenavModule, MatGridListModule,
    MatSelectModule, MatDividerModule,
    MatIconModule, MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule
  } from '@angular/material';
  import { FlexLayoutModule } from '@angular/flex-layout';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  @NgModule({
      imports: [MatToolbarModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatInputModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule,
         FormsModule,ReactiveFormsModule
       ],
      exports: [ MatToolbarModule, MatMenuModule,
        MatButtonModule, MatInputModule, MatIconModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule,FormsModule,ReactiveFormsModule
      ]
  })
export class SharedModule {

}
