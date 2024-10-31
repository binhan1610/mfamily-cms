import React from 'react';

function LoadingPage() {
  // return <div className='loader-page loader hour-glass'></div>;
  return (
    <div className='container-loader'>
      <div className='loader-swapper'>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--text'></div>
      </div>
    </div>
  );
}

export default LoadingPage;
