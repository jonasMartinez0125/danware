import React from 'react';

export const ButtonSpinner = () => {
  return (
    <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span className="ms-2">Loading...</span>
    </>
  )
}
