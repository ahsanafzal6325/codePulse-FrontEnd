import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
 
 id: string | null = null;
 paramsSunscription?: Subscription; 
constructor(private route: ActivatedRoute) {

}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
       this.id =  params.get('id');
      }
    });
  }
}
