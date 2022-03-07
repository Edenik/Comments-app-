export interface Comment extends NewComment {
    postId: number ;
    id:     number;
}

export interface NewComment {
    name:   string;
    email:  string;
    body:   string;
}

