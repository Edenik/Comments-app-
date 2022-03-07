import { Comment, NewComment } from "../models/comment.model";
import { Post } from "../models/post.model";
import { getRequest, postRequest } from "./http.service";

export const getComments = async (skip: number , limit: number) => {
    const resp = await getRequest<Comment[]>(`https://jsonplaceholder.typicode.com/comments?_start=${skip}&_limit=${limit}`);
    return resp
}

export const getPost = async (postId: number) => {
    const resp = await getRequest<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return resp
}

export const postComment = async (newComment: NewComment) => {
    const resp = await postRequest<NewComment>(`https://test.steps.me/test/testAssignComment`, newComment);
    return resp
}
