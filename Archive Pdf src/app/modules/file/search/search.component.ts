import { Component, OnInit } from '@angular/core'
import { File } from '../models/file.model'
import { FileService } from '../services/file.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  PdfName = ''
  files?: File[]
  doc?: any
  data(file: any) {
    this.doc = `assets/archive/${file}`
    //  this.doc = `D:/SVN/Archive PDF/Sourcecode/Archive_PDF_API/archive/${file}`
  }

  public page = 2

  public pageLabel!: string
  constructor(private fileService: FileService) {}

  ngOnInit(): void {}
  searchPdf(): void {
    var myData = {
      SearchData: this.PdfName,
    }
    this.fileService.findByPdfName(myData).subscribe({
      next: (data: any) => {
        this.files = data.data
      },
      error: (e) => console.error(e),
    })
  }
}
