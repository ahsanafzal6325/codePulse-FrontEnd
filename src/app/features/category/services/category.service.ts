import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../modals/add-category-request.modal';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../modals/category.model';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryRequest } from '../modals/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  




  getAllcategories(query?: string, sortBy? : string , sortDirection? : string): Observable<Category[]>{
    let payload = new HttpParams();

    if(query){
      payload = payload.set('query',query);
    }
    if(sortBy){
      payload = payload.set('sortBy',sortBy);
    }
    if(sortDirection){
      payload = payload.set('sortDirection',sortDirection);
    }
    return this.http.get<Category[]>(`${environment.BASE_URL}/Categories`, {
      params: payload
    });
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.BASE_URL}/Categories/${id}`);
  }





  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(`${environment.BASE_URL}/Categories?addAuth=true`,model);
  }

  


  updatecategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category>{
    console.log(updateCategoryRequest);
    console.log(id);
    return this.http.put<Category>(`${environment.BASE_URL}/Categories/${id}?addAuth=true`, updateCategoryRequest);
  }
  deleteCategory(id: string): Observable<string> {
    return this.http.delete(`${environment.BASE_URL}/Categories/${id}?addAuth=true`, { responseType: 'text' });
  }
  
 



}

