import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {




  
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form',{static: false}) imageUploadForm?: NgForm;



  constructor(private imageService: ImageService) {
  }




  ngOnInit(): void {
    this.getImages();
  }

  selectImage(file: BlogImage): void{
    this.imageService.selectImage(file);
  }

  uploadImage(): void {
    if (this.file && this.file.name !== '' && this.title !== '') {
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) =>{
          console.log('Image uploaded successfully:', response);
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    } else {
      console.error('No file selected for upload.');
    }

  }


  onFileUploadChnge(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.file = element.files?.[0];

  }


   private getImages(){
    this.images$ = this.imageService.getAllImages();

   }

}
