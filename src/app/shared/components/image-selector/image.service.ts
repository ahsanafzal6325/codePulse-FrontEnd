import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtention: '',
    fileName: '',
    title: '',
    url: '',
    createdDate: new Date()
  });

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.BASE_URL}/Images`);
  }

  uploadImage(file: File,fileName: string, title: string): Observable<BlogImage>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<BlogImage>(`${environment.BASE_URL}/Images`, formData);
  }


  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
    
}
