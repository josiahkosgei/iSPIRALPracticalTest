import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ConfigurationService } from './services/configuration.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TransactionCreateComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ToastNoAnimationModule.forRoot(),
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
