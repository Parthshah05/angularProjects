import { Component, OnInit } from '@angular/core'
import { File } from '../models/file.model'
import { FileService } from '../services/file.service'
import { Router } from '@angular/router'
import { Sort } from '@angular/material/sort'

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
})
export class UploadfileComponent implements OnInit {
  files?: File[]
  filePagination?: File[]
  fileSort?: File[]
  currentData: File = {}
  currentIndex = -1
  selectedFiles?: any

  constructor(private fileService: FileService, private router: Router) {}
  ngOnInit(): void {
    let Name = localStorage.getItem('userLogin')
    // let token = localStorage.getItem('token')
    // console.log(token)
    if (Name == null) {
      this.router.navigate(['auth/login'])
    }

    this.retrieveData()
  }
  selectFiles(event: any) {
    this.selectedFiles = event.target.files
    this.uploadFiles()
  }
  retrieveData(): void {
    this.fileService.getAll().subscribe({
      next: (data: any) => {
        this.files = data.data
        this.fileSort = this.files
        this.onPageChange({
          pageIndex: 0,
          pageSize: 5,
          length: this.filePagination?.length,
        })
        console.log(data)
      },
      error: (e) => console.error(e),
    })
  }

  deleteData(id: any): void {
    this.fileService.delete(id).subscribe({
      next: (res) => {
        console.log(res)
        this.refreshList()
      },
      error: (e) => console.error(e),
    })
  }
  openFileSelector(): void {}

  refreshList(): void {
    this.retrieveData()
  }

  onPageChange(pageEvent: any) {
    let startIndex = pageEvent.pageIndex * pageEvent.pageSize
    let lastIndex = startIndex + pageEvent.pageSize
    if (lastIndex > pageEvent.length) {
      lastIndex = pageEvent.length
    }
    this.filePagination = this.fileSort?.slice(startIndex, lastIndex)
  }

  sortData(sort: Sort) {
    const data = this.files?.slice()
    if (!sort.active || sort.direction === '') {
      this.fileSort = data
    } else {
      this.fileSort = data?.sort((a, b) => {
        const aValue = (a as any)[sort.active]
        const bValue = (b as any)[sort.active]
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1)
      })
    }
    this.onPageChange({
      pageIndex: 0,
      pageSize: 5,
      length: this.filePagination?.length,
    })
  }
  upload(file: any) {
    this.fileService.upload(file).subscribe(
      (event) => {
        console.log(event)
      },
      (err) => {
        console.log(err)
      },
    )
  }

  uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(this.selectedFiles[i])
    }
    alert('File Uploaded Successfully')
    this.retrieveData()
  }
}
