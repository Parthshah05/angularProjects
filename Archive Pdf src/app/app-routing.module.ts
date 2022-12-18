import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './modules/home/home.component'
import { SearchComponent } from './modules/file/search/search.component'
import { AuthGuard } from './modules/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'User',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'File',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/file/file.module').then((mod) => mod.FileModule),
  },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  
  { path: 'searchpdf', component: SearchComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
