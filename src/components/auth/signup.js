import React, { useContext } from 'react';
import { LoginContext } from './context';
import { Button, Form, Col } from 'react-bootstrap'

import { If, Then, Else } from 'react-if';

const Signup = () => {

    const context = useContext(LoginContext);

    const signUpSubmit = e => {
        e.preventDefault();
        let password = e.target.Password.value;
        let username = e.target.username.value;     
        let role = e.target.role.value;  
        let email = e.target.email.value;     

        let body = {
            password,
            username,
            role,
            email	
        }

        context.signup(body)
    };

    return (
        <>
            <If condition={!context.loggedIn}>
                <Then>
                    <Form onSubmit={signUpSubmit}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form.Group  controlId="formGridEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter Username" name='username'/>
                            </Form.Group>

                            <Form.Group  controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='Password' />
                            </Form.Group>
                            <Form.Group  controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="Email" placeholder="Email" name='email' />
                            </Form.Group>
                            <Form.Group  controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." name='role'>
                                    <option>admin</option>
                                    <option>editor</option>
                                    <option>user</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Form>
                </Then>
            </If>
        </>
    );
};

export default Signup;
