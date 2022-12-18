import { Component, OnInit, Input } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms'
import { UserService } from '../services/services.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    ContactNumber: new FormControl(''),
    RoleId: new FormControl(''),
  })
  submitted = false
  message = ''
  id: any

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    let Name = localStorage.getItem('userLogin')
    if (Name == null) {
      this.router.navigate(['auth/login'])
    }

    this.id = this.route.snapshot.params['id']
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
      Email: [{ value: '', disabled: true }, [Validators.required]],
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

    this.userService.get(this.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.form.setValue({
          FirstName: data.data[0].FirstName,
          LastName: data.data[0].LastName,
          Email: data.data[0].Email,
          Password: data.data[0].Password,
          ContactNumber: data.data[0].ContactNumber,
          RoleId: data.data[0].RoleId,
        })
        console.log(this.form)
      },
    })
  }
  get f() {
    return this.form.controls
  }
  updateData(): void {
    this.message = ''
    this.submitted = true
    this.userService.update(this.id, this.form.value).subscribe({
      next: (res) => {
        console.log(res)
        if (this.form.invalid) {
          return
        }
        this.message = res.message
          ? res.message
          : 'This Record was updated successfully!'
        this.router.navigate(['user'])
      },
      error: (e) => console.error(e),
    })
  }
  cancel() {
    this.router.navigate(['User/user'])
  }
}
