export interface AddBlogpost {
    title: string;
    shortDescription: string;
    content: string;
    featuredimageUrl: string; 
    urlHandle: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
}