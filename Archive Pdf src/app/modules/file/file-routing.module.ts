import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadfileComponent } from './uploadfile/uploadfile.component'
import { OcrComponent } from './ocr/ocr.component'

const routes: Routes = [
  { path: 'uploadfile', component: UploadfileComponent },
  { path: 'ocrfile', component: OcrComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
