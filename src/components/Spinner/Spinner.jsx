import React, { useState,useEffect} from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const GlobalSpinner = () => {
  const [loading, setLoading] = useState(false);
//   useEffect(()=>{
//   setLoading(true)
//    setTimeout(()=>{
//     setLoading(false)
//    },4000)
//  },[])
const toggleLoading = (showSpinner) => {
    setLoading(showSpinner);
  };

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={'#F37A24'}
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default GlobalSpinner;