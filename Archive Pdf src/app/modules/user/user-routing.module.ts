import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component'
import { EditUserComponent } from "./edit-user/edit-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddModalComponent } from "./add-modal/add-modal.component"


const routes: Routes = [
  { path: 'user', component: UserListComponent },
  { path: 'user/:id', component: EditUserComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'useredit/:id', component: EditUserComponent },
  { path: 'addmodal', component: AddModalComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
