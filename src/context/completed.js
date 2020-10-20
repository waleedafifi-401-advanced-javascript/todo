import React, { useState, setState } from 'react';

export const CompleteContext = React.createContext();

export default function CompleteProvider(props) {

    const [showComplete, setShowComplete] = useState(true);

    const state = {
        showComplete,
        setShowComplete
    }


    return (
        <CompleteContext.Provider value={state}>
        {props.children}
        </CompleteContext.Provider>
    )
}