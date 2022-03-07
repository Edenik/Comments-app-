import React from 'react';
import { Spinner } from 'reactstrap';

import './index.css';
import { CommentCard } from './components/comment_card';
import { getComments, getPost } from './data/data.service';
import { Comment } from './models/comment.model';
import { Post } from './models/post.model';
import { GenericModal } from './components/modal';

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
  const [skipAmount, setSkipAmount] = React.useState<number>(0);
  const [comments, setComments] = React.useState<Comment[] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const [currentPost, setCurrentPost] = React.useState<Post | null>(null);
  const [postsCache, setPostsCache] = React.useState<any>({});
  const limit = 20;

  React.useEffect(() => {
    fetchData();
  }, [])

  const handleScroll = (e: any) => {
    try {
      const element = e.target;
      if (element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight || element.scrollHeight - Math.floor(element.scrollTop) === element.clientHeight) {
        setSkipAmount(skipAmount + 20)
        setIsLoadingMore(true);
        fetchData();
      }
    } catch (error) {
      console.log({ error })
    }
  }


  const fetchData = async () => {
    try {
      const data = await getComments(skipAmount, limit);
      if (data && data.length) {
        if (comments != null) {
          setComments([...comments, ...data]);
          setIsLoadingMore(false);
        } else {
          setComments(data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const fetchPostData = async (comment: Comment) => {
    try {
      if (postsCache[comment.postId] != null) {
        setCurrentPost(postsCache[comment.postId]);
      } else {
        const data = await getPost(comment.postId);
        if (data) {
          setCurrentPost(data);
          setPostsCache({ ...postsCache, [comment.postId]: data })
        }
      }
      
      setIsModalOpen(true);
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <>
      {isLoading ? <div id='spinner'>
        <div className='d-flex justify-content-center align-'>
          <Spinner></Spinner>
        </div>
      </div> :
        <div className='container'  >
          <h1 className='mb-5 mt-5'>Comments: ({comments?.length})</h1>

          <div id='comments' onScroll={handleScroll} style={{ height: '75VH' }}>

            {comments?.map((comment: Comment, idx: number) =>
              <div className='mt-4'>
                <CommentCard getPost={() => fetchPostData(comment)} comment={comment} idx={idx} key={comment.id} />
              </div>
            )}

            {isLoadingMore && <div className='d-flex mt-5 mb-5 justify-content-center'>
              <Spinner></Spinner>
            </div>}
          </div>

        </div>}

      {isModalOpen && currentPost ?
        <GenericModal modalTitle={currentPost.title} modalBody={
          <>{currentPost.body }</>}
          isModalOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
            setCurrentPost(null);
          }} /> : null}

    </>
  );
}

export default App;
