import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";
import { getRequest } from "./http.service";

export const getComments = async (skip: number , limit: number) => {
    const resp = await getRequest<Comment[]>(`comments?_start=${skip}&_limit=${limit}`);
    return resp
}

export const getPost = async (postId: number) => {
    const resp = await getRequest<Post>(`posts/${postId}`);
    return resp
}

// export const createNewAisle = async (layoutId: any) => {
//     const resp = await postRequest<any>(`planogram/new/createNewAisle`, { layoutId });
//     return resp
// }
