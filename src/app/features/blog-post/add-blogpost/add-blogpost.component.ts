import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/modals/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogpost;
  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService
  ){
    this.model = {
      title:'',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllcategories();
  }


  onFormSubmit(): void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/admin/blogposts');

      }
    })
  }
}
