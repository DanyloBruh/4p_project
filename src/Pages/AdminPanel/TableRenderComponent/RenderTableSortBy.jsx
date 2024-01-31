import React from 'react';

/* eslint-disable react/prop-types */
function RenderTableSortBy({ category }) {
  switch (category) {
    case 'product':
      return (
        <>
          <option>name</option>
          <option>description</option>
          <option>weight</option>
          <option>price</option>
          <option>ingredients</option>
        </>
      );
    case 'instruction':
      return (
        <>
          <option>name</option>
          <option>difficulty</option>
          <option>time</option>
          <option>makes</option>
          <option>description</option>
          <option>ingredients</option>
          <option>text</option>
        </>
      );
    case 'blog':
      return (
        <>
          <option>name</option>
          <option>text</option>
        </>
      );
    case 'order':
      return (
        <>
          <option>name</option>
          <option>address</option>
          <option>comment</option>
          <option>paymentType</option>
          <option>deliveryType</option>
          <option>totalAmount</option>
          <option>status</option>
        </>
      );
    case 'user':
      return (
        <>
          <option>name</option>
          <option>email</option>
        </>
      );
    default:
      return <div style={{ background: 'none' }} />;
  }
}

export default RenderTableSortBy;
