import React, { useContext, useState, useEffect, useCallback } from 'react';

import { LoginContext } from './context';

import { If } from 'react-if';

const Auth = (props) => {

    const context = useContext(LoginContext);
    const [okToRender, setOkToRender] = useState(false)

    const OK = useCallback(() => {

        let ok = context.loggedIn &&
        (props.capability ? context.can(props.capability) : true);

        console.log(props.capability);
        setOkToRender(ok);

        if (!ok) {
        console.warn('Not Authorized In');
        }

        return ok;

    },[context, props.capability])


    useEffect(() => {
        OK();
    }, [OK]);

    return (
        <If condition={okToRender || false}>
            {props.children}
        </If>
    );

};

export default Auth;