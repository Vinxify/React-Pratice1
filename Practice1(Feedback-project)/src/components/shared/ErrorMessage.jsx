import React from "react";

function ErrorMessage({ message }) {
  return (
    <>
      <p className='error'>
        <span>🚨</span>
        {message}
      </p>
      <br />
      <p>Check your internet connection!!!</p>
    </>
  );
}

export default ErrorMessage;
