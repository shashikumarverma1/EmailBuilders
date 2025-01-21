export interface EmailTemplate {
    id?: string;
    title: string;
    content: string;
    imageUrl: string;
    footer: string;
    created_at?: string;
  }
  
  export interface EmailLayout {
    html: string;
  }