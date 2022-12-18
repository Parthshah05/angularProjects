import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { UserRoutingModule } from './user-routing.module'
import { AddUserComponent } from './add-user/add-user.component'
import { UserListComponent } from './user-list/user-list.component'
import { EditUserComponent } from './edit-user/edit-user.component'
import { AddModalComponent } from './add-modal/add-modal.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AddUserComponent,
    UserListComponent,
    EditUserComponent,
    AddModalComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
  
  ],
})
export class UserModule {}
