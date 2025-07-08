import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../modals/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
 
 id: string | null = null;
 paramsSunscription?: Subscription; 
 category?: Category;
constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
   
}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
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
    console.log(this.category);
    
  }
}
