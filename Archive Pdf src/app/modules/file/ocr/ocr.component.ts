import { Component, OnInit } from '@angular/core'
import { File } from '../models/file.model'
import { FileService } from '../services/file.service'
import { Router } from '@angular/router'
import { Sort } from '@angular/material/sort'

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css'],
})
export class OcrComponent implements OnInit {
  files?: File[]
  data: any = []

  filePagination?: File[]
  fileSort?: File[]
  currentData: File = {}
  currentIndex = -1

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
  // getData(isSelected:any, fileDesc:any){
  //   console.log(isSelected, fileDesc)
  //   var myData:any = {
  //     FileId: isSelected,
  //     FileDescription: fileDesc
  // };
  //   this.data.push(myData)

  // }
  getData(e: any, file: any) {
    var myData: any
    if (e.target.checked) {
      myData = {
        FileId: file.FileId,
        FileDescription: file.FileDescription,
      }
      this.data.push(myData)
    } else {
      myData = {
        FileId: file.FileId,
        FileDescription: file.FileDescription,
      }
      this.data.pop(myData)
    }
  }

  retrieveData(): void {
    this.fileService.getOcr().subscribe({
      next: (data: any) => {
        this.files = data.data
        this.fileSort = this.files
        this.onPageChange({
          pageIndex: 0,
          pageSize: 10,
          length: this.filePagination?.length,
        })
        console.log(data)
      },
      error: (e) => console.error(e),
    })
  }

  refreshList(): void {
    this.retrieveData()
  }

  performOcr(): void {
    console.log(this.data)

    this.fileService.ocr(this.data).subscribe({
      next: (res) => {
        console.log(res)
        alert('Ocr Performed Successfully')
        this.refreshList()
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
      pageSize: 10,
      length: this.filePagination?.length,
    })
  }
}
