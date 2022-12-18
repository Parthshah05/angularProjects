import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/modules/user/models/user.model'
import { UserService } from '../services/services.service'
import { Router } from '@angular/router'
import { Sort } from '@angular/material/sort'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { AddModalComponent } from '../add-modal/add-modal.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = []
  e: any = []
  myData: any[] = []
  file: any = []
  userPagination?: User[]
  userSort: any = []
  currentData: User = {}
  currentIndex = -1
  FirstName = ''
  constructor(
    private demoService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private matsnack: MatSnackBar,
  ) {}
  ngOnInit(): void {
    // let Name = localStorage.getItem('userLogin')
    // let token = localStorage.getItem('token')
  
    // if (Name == null) {
    //   this.router.navigate(['auth/login'])
    // }

    this.retrieveData()
  }
  retrieveData(): void {
    this.demoService.getAll().subscribe({
      next: (data: any) => {
        this.users = data.data
        this.userSort = this.users
        this.onPageChange({
          pageIndex: 0,
          pageSize: 20,
          length: this.userPagination?.length,
        })
      },
      error: (e) => console.error(e),
    })
  }

  // getData(e: any, file: any) {
  //   // var myData: any

  //   console.log(file)
  //   if (e.target.checked) {
  //     // myData = {
  //     //   FileId: file.FileId,
  //     //   FileDescription: file.FileDescription,
  //     // }
  //     this.myData.push(file)
  //   } else {
  //     // myData = {
  //     //   FileId: file.FileId,
  //     //   FileDescription: file.FileDescription,
  //     // }
  //   //  this.myData.pop(file)
  //     const index = this.myData.findIndex(list => list.FileId == file.FileId);//Find the index of stored id
  //     this.myData.splice(index, 1); // Then remove

  //   }
  //   console.log(this.myData)
  // }

  getData(e: any, file: any) {
    // var myData: any
    var index = this.myData.indexOf(file)
    console.log(file)
    if (e.target.checked) {
      // myData = {
      //   FileId: file.FileId,
      //   FileDescription: file.FileDescription,
      // }
      this.myData.push(file)
      // this.myData.push(file)
    } else {
      // myData = {
      //   FileId: file.FileId,
      //   FileDescription: file.FileDescription,
      // }
      //  this.myData.pop(file)
      //  const index = this.myData.findIndex(list => list.FileId == file.FileId);//Find the index of stored id
      this.myData.splice(index, 1) // Then remove
    }
    console.log(this.myData)
  }
  checkAll(e: any) {
    var checkboxes = document.getElementsByTagName('input')

    if (e.target.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
          checkboxes[i].checked = true
        }
      }
      this.myData = []

      this.myData = this.users
      console.log(this.myData)
    } else {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
          checkboxes[i].checked = false
        }
      }
      this.myData = []
    }
  }
  deleteData(id: any): void {
    this.demoService.delete(id).subscribe({
      next: (res) => {
        this.matsnack.open('Delete User Successfully', 'Dissmiss', {
          duration: 2000,
        })
        this.refreshList()
      },
      error: (e) => console.error(e),
    })
  }

  refreshList(): void {
    this.retrieveData()
  }

  searchName(): void {
    this.currentData = {}
    this.currentIndex = -1
    this.demoService.findByName(this.FirstName).subscribe({
      next: (data: any) => {
        this.userPagination = data.data
      },
      error: (e) => console.error(e),
    })
  }

  onPageChange(pageEvent: any) {
    let startIndex = pageEvent.pageIndex * pageEvent.pageSize
    let lastIndex = startIndex + pageEvent.pageSize
    if (lastIndex > pageEvent.length) {
      lastIndex = pageEvent.length
    }
    this.userPagination = this.userSort?.slice(startIndex, lastIndex)
  }

  sortData(sort: Sort) {
    const data = this.users.slice()
    if (!sort.active || sort.direction === '') {
      this.userSort = data
    } else {
      this.userSort = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active]
        const bValue = (b as any)[sort.active]
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1)
      })
    }
    this.onPageChange({
      pageIndex: 0,
      pageSize: 20,
      length: this.userPagination?.length,
    })
  }
  ExportToPdf() {
    var user: any = []
    this.myData.forEach((e: any) => {
      var tempObj = []
      tempObj.push(e.FirstName)
      tempObj.push('')
      tempObj.push(e.LastName)
      tempObj.push('')
      tempObj.push(e.Email)
      tempObj.push('')
      tempObj.push(e.ContactNumber)
      tempObj.push('')
      user.push(tempObj)
    })
    const doc = new jsPDF()
    autoTable(doc, {
      head: [['First Name', '', 'Sur Name', '', 'Email', '', 'Contact Number']],
      body: user,
    })
    doc.save('User' + '.pdf')
  }
  onadd() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(AddModalComponent, dialogConfig)
  }
  ExportTOExcel() {
    let userList = this.users.map((user: any) => {
      return {
        'First Name': user.FirstName,
        'Sur Name': user.LastName,
        Email: user.Email,
        'Contact Number': user.ContactNumber,
      }
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(userList)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    for (let index = 1; index <= this.users.length + 1; index++) {
      delete ws['G' + index]
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Users')
    XLSX.writeFile(wb, 'Users.xlsx')
  }
}
