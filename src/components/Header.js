import React from 'react';

function Header (props){

  return (
    <div className='header-container'>
      <h1 className='welcome'>{props.title}</h1>
      <button className='switch-button' onClick={()=>props.switchPage()}>{props.buttonTitle}</button>
    </div>
  )
}

export default Header;
