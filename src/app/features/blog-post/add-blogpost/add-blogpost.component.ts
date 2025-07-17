import { ImageService } from 'src/app/shared/components/image-selector/image.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/modals/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogpost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectorSubscription?: Subscription;


  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private imageService: ImageService,
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

    this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
      next: (image) => {
        if (image) {
          this.model.featuredImageUrl = image.url;
          this.model.title = image.title;
          this.isImageSelectorVisible = false;
        }
      }
    })


  }


  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closImageSelector(): void {
    this.isImageSelectorVisible = false;
  }


  onFormSubmit(): void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/admin/blogposts');

      }
    })
  }

   ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
