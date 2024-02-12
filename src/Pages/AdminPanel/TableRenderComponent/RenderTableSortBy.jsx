import React from 'react';

/* eslint-disable react/prop-types */
function RenderTableSortBy({ category }) {
  switch (category) {
    case 'product':
      return (
        <>
          <option>none</option>
          <option>name</option>
          <option>weight</option>
          <option>price</option>
        </>
      );
    case 'instruction':
      return (
        <>
          <option>none</option>
          <option>name</option>
          <option>difficulty</option>
          <option>makes</option>
          <option>carrousel</option>
        </>
      );
    case 'blog':
      return (
        <>
          <option>none</option>
          <option>name</option>
          <option>show place</option>
        </>
      );
    case 'order':
      return (
        <>
          <option>none</option>
          <option>name</option>
          <option>paymentType</option>
          <option>deliveryType</option>
          <option>totalAmount</option>
          <option>status</option>
          <option>createdAt</option>
          <option>updatedAt</option>
        </>
      );
    case 'user':
      return (
        <>
          <option>none</option>
          <option>name</option>
          <option>email</option>
        </>
      );
    default:
      return <option>empty</option>;
  }
}

export default RenderTableSortBy;
