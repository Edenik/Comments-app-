import * as React from 'react';
import { Button, Card, CardText, CardTitle, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';
import { Comment, NewComment } from '../models/comment.model';

interface Props {
    readonly handleFormSubmit: (newComment: NewComment) => void;
}

export const PostForm: React.FC<Props> = (props: Props) => {
    const { handleFormSubmit } = props;

    const [errors, setErrors] = React.useState<NewComment>({ body: '', name: '', email: '' });
    const [newComment, setNewComment] = React.useState<NewComment>({ body: '', name: '', email: '' });
    const emailRex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    React.useEffect(() => {
        if (errors.body.length !== 0 || errors.email.length !== 0 || errors.name.length !== 0) {
            handleCheckValidation();
        }
    }, [newComment])

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const _formErrors = handleCheckValidation();
        if (_formErrors.body.length === 0 && _formErrors.email.length === 0 && _formErrors.name.length === 0) {
            handleFormSubmit(newComment)
        }
    }


    const handleCheckValidation = () => {
        const _formErrors = { body: '', name: '', email: '' };
        if (!emailRex.test(newComment.email)) {
            _formErrors.email = 'Must enter a valid mail';
        }

        if (newComment.name.trim().length < 3) {
            _formErrors.name = 'Must enter name more than 3 chars.';
        }

        if (newComment.body.trim().length < 3) {
            _formErrors.body = 'Must enter comment body more than 3 chars.';
        }

        setErrors(_formErrors);
        return _formErrors;
    }

    const formFields = [
        {
            id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', invalid: errors.email.length > 0, error: errors.email,
            onChange: (e: React.FormEvent<HTMLInputElement>) => setNewComment({ ...newComment, email: e.currentTarget.value })
        },
        {
            id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', invalid: errors.name.length > 0, error: errors.name,
            onChange: (e: React.FormEvent<HTMLInputElement>) => setNewComment({ ...newComment, name: e.currentTarget.value })
        },
        {
            id: 'body', label: ' Comment body:', type: 'textarea', placeholder: 'Enter comment body', invalid: errors.body.length > 0, error: errors.body,
            onChange: (e: React.FormEvent<HTMLInputElement>) => setNewComment({ ...newComment, body: e.currentTarget.value })
        }
    ];

    return (
        <>
            <Form onSubmit={handleSubmitForm}>
                {formFields.map((field) => {
                    return (<FormGroup key={field.id}>
                        <Label for={field.id}>
                            {field.label}
                        </Label>
                        <Input
                            id={field.id}
                            name={field.id}
                            placeholder={field.label}
                            type={field.type as InputType}
                            invalid={field.invalid}
                            onChange={field.onChange}
                        />
                        <FormFeedback>
                            {field.error}
                        </FormFeedback>

                    </FormGroup>)
                })}
                <Button>
                    Submit
                </Button>
            </Form>
        </>
    );
};



