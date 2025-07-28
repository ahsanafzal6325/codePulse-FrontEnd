import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }


  createBlogPost(data: AddBlogpost): Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.BASE_URL}/blogposts?addAuth=true`, data);
  }
  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.BASE_URL}/blogposts`);
  }
  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.BASE_URL}/blogposts/${id}`);
  }


  getBlogPostByUrl(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.BASE_URL}/blogposts/${urlHandle}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.BASE_URL}/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }
  deleteBlogPost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}/blogposts/${id}?addAuth=true`);
  }
}
