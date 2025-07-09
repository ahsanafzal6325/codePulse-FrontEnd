import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../modals/category.model';
import { UpdateCategoryRequest } from '../modals/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
 
 id: string | null = null;
 paramsSubscription?: Subscription; 
 editCategorySubscription?: Subscription; 
 category?: Category;
constructor(private route: ActivatedRoute, 
  private categoryService: CategoryService,
  private router: Router) {
   
}
  ngOnInit(): void {
    this.paramsSubscription =  this.route.paramMap.subscribe({
      next: (params) =>{
       this.id =  params.get('id');
       if(this.id){
           this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) =>{
              this.category = response;
            }
           });
       }
      }
    });
  }


  onSubmit(): void{
    const updateCategoryRequest : UpdateCategoryRequest={
      namee: this.category?.name || '',
      urlHandle: this.category?.urlHandle || ''
    };

    // pass this object to service
    if(this.id){
      this.editCategorySubscription = this.categoryService.updatecategory(this.id, updateCategoryRequest)
      .subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
