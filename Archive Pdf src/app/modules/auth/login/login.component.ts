import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/services.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Email: new FormControl(''),
    password: new FormControl(''),
  })
  submitted = false
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}',
          ),
        ],
      ],
      Password: ['', Validators.required],
    })
  }
  get f() {
    return this.form.controls
  }
  loginData(): void {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('userLogin', res)
        // localStorage.setItem('token',res.data.token);
        alert('Login Successfull')
        this.router.navigate(['home'])
      },
      error: (e) => {
        console.error(e), this.router.navigate(['login'])
        alert(e.error.message)
        this.form.reset()
      },
    })
  }
}
