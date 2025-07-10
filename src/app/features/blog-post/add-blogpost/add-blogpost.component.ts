import { Component } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogpost;

  constructor(){
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
    console.log(this.model);
  }
}
