import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../modals/add-category-request.modal';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService,
    private router: Router
  ){
    this.model = {
      name: '',
      urlHandle:''
    };
  }
  
  onFormSubmit(){
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['/admin/categories']);
        console.log('Category added successfully');
      },
      error: (error)=>{
        console.log('Error');
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
