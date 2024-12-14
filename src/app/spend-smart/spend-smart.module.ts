import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpendSmartRoutingModule } from './spend-smart-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpendSmartRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
  ],
  providers: [], 
})
export class SpendSmartModule {}
