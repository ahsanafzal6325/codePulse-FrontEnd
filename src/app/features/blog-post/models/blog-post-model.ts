export interface BlogPost{
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    featuredimageUrl: string; 
    urlHandle: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
}