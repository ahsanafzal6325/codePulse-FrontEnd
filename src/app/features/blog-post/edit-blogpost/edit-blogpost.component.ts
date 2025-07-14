import { BlogPostService } from './../services/blog-post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/modals/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  
  id: string | null = null;
  model?: BlogPost
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription
  getBlogPostPostSubscription?: Subscription
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];




  constructor(private route: ActivatedRoute,
  private blogPostService: BlogPostService,
  private categoryService: CategoryService,
  private router: Router) {

   }
  
  ngOnInit(): void {

    this.categories$ =  this.categoryService.getAllcategories();



   this.routeSubscription =  this.route.paramMap.subscribe({
      next: (params)=>{
        this.id = params.get('id');
        
        // Get BogPost from API or service using this.id
        if (this.id) {
          this.getBlogPostPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) =>{
              this.model = response;
              this.selectedCategories = response.categories.map(category => category.id);

            }
          });
        }
      }
    });
  }


  onFormSubmit(): void {
    if(this.model && this.id){
      var updateBlogPost: UpdateBlogPost={
        author: this.model.author,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        id: this.id,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        shortDescription: this.model.shortDescription,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories || []
      }
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (error) => {
          console.error('Error updating blog post', error);
          // Handle error appropriately
        }
      })
    }
    // Convert this model to object

  }
  

  onDelete(): void {
    if (this.id) {
      this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (error) => {
          console.error('Error deleting blog post', error);
          // Handle error appropriately
        }
      });
    }
  }
  
  
  
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostPostSubscription?.unsubscribe();
  }
}
