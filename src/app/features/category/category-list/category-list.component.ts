import { Observable } from 'rxjs';
import { Category } from '../modals/category.model';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllcategories();
    
  }

  sort(sortBy: string, sortDirection: string){
    this.categories$ = this.categoryService.getAllcategories(undefined , sortBy , sortDirection)
  }
  onSearch(query?: string){
    this.categories$ = this.categoryService.getAllcategories(query);
  }
}
