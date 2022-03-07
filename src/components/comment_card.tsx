import * as React from 'react';
import { Button, Card, CardText, CardTitle } from 'reactstrap';
import { Comment } from '../models/comment.model';

interface Props {
    readonly comment: Comment;
    readonly idx: number;
    readonly getPost: () => void;
}

export const CommentCard: React.FC<Props> = (props: Props) => {
    const { comment, idx, getPost } = props;

    return (
        <>
            <Card body>
                <CardTitle tag="h5">
                    #{idx + 1} {comment.name}
                </CardTitle>
                <CardText>
                    {comment.body}
                </CardText>

                <div>
                    <Button onClick={() => getPost()}>
                        Launch post (#{comment.postId})
                    </Button>
                </div>
            </Card>
        </>
    );
};



