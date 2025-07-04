import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../modals/add-category-request.modal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../modals/category.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(`${environment.BASE_URL}/Categories`,model);
  }




  getAllcategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.BASE_URL}/Categories`);
  }
 



}

