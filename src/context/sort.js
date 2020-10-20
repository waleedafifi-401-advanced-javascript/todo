import React, { useState } from 'react';

export const SortContext = React.createContext();

function SortProvider (props) {
    const [sortBy, /*setSortBy*/] = useState('difficulty');
    // const sortOptions = ['difficulty','assignee','text'];

    const state = {
        sortBy,
    };

    return (
        <SortContext.Provider value={state}>
            {props.children}
        </SortContext.Provider>
    )
}

export default SortProvider;
