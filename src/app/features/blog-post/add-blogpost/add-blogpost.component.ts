import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogpost;

  constructor(private blogPostService: BlogPostService,private router: Router){
    this.model = {
      title:'',
      shortDescription: '',
      content: '',
      featuredimageUrl: '',
      urlHandle: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }


  onFormSubmit(): void{
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/admin/blogposts');

      }
    })
  }
}
