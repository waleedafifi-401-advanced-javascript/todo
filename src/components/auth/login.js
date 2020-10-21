import React, { useContext, useState } from 'react';
import { LoginContext } from './context.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { If, Then, Else } from 'react-if';

const Login = () => {

    const context = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        context.login(username, password);
    };

    return (
        <>
        <If condition={context.loggedIn}>
            <Then>
            <Button variant="danger" onClick={context.logout}>Log Out</Button>
            </Then>
            <Else>
            <Form inline
            onSubmit={handleSubmit}
            className=" mr-sm-10"
            >


                <Form.Control
                className="mr-sm-5"
                placeholder='UserName'
                name='username'
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                />

                <Form.Control
                className="mr-sm-5"
                placeholder='password'
                name='password'
                type='text'
                onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" variant="dark" className="mr-sm-4" size="md">Login</Button>
            </Form>
            </Else>
        </If>
        </>
    );
};

export default Login;