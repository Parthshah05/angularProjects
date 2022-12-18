import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Archive PDF';
  isloggein$:boolean=false;
  constructor(private router: Router) {
  
  }
  ngOnInit():void{
    if (localStorage.getItem('userLogin') != null) this.isloggein$ = true
  }
  logout() {
    localStorage.removeItem('userLogin')
    localStorage.clear()
    this.router.navigate(['auth/login'])
  }
  user(){
    this.router.navigate(['User/user'])
  }
}
