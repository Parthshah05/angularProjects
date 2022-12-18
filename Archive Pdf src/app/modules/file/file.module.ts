import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileRoutingModule } from './file-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'
import { UploadfileComponent } from './uploadfile/uploadfile.component'
import { OcrComponent } from './ocr/ocr.component'

@NgModule({
  declarations: [
    UploadfileComponent,
    OcrComponent,
  ],
  imports: [
    CommonModule,
    FileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
  ]
})
export class FileModule { }
