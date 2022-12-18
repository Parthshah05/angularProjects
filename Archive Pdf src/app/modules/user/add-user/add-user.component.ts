import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../services/services.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    ContactNumber: new FormControl(''),
    RoleId: new FormControl(''),
  })

  submitted = false
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    let Name = localStorage.getItem('userLogin')
    if (Name == null) {
      this.router.navigate(['auth/login'])
    }

    this.form = this.formBuilder.group({
      FirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      LastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
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
      ContactNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      RoleId: ['', Validators.required],
    })
  }
  get f() {
    return this.form.controls
  }
  saveData(): void {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.userService.create(this.form.value).subscribe({
      next: (res) => {
        console.log(res)
        alert('User Added Successfully')
        this.router.navigate(['user'])
      },
      error: (e) => console.error(e),
    })
  }
  cancel() {
    this.router.navigate(['User/user'])
  }
}
