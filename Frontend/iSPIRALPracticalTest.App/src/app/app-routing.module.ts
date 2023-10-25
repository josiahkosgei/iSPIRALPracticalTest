import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "transaction-list"},
  {path: "transaction-create", component: TransactionCreateComponent},
  {path: "transaction-list", component: TransactionListComponent}  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
