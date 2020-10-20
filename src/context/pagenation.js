import React, { useState } from 'react';

export const NumPerScreenContext = React.createContext();

function NumPerScreenProvider (props) {
  const [numPer, /*setSortBy*/] = useState(3);

  const state = {
    numPer,
  };

  return (
    <NumPerScreenContext.Provider value={state}>
      {props.children}
    </NumPerScreenContext.Provider>
  )

}


export default NumPerScreenProvider;