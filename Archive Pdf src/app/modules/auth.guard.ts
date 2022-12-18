import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private Router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('userLogin')) {
      console.log('true')
      return true
    } else {
      localStorage.clear()
      sessionStorage.clear()
      console.log('false')
      this.Router.navigate(['auth/login'])
      return false
      //  window.location.href = window.location.origin + Constant.FrontLoginRedirection;
    }
  }
}
