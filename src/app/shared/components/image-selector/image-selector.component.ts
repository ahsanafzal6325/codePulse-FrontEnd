import { Component } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {




  
  private file?: File;
  fileName: string = '';
  title: string = '';
  constructor(private imageService: ImageService) {
  }



  uploadImage(): void {
    if (this.file && this.file.name !== '' && this.title !== '') {
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) =>{
          console.log('Image uploaded successfully:', response);
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

}
