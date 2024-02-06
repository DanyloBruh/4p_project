import React from 'react';

import editIcon from '../../../Assets/editicon.png';
import deleteIcon from '../../../Assets/deleteicon.png';

/* eslint-disable react/prop-types */
function RenderTableHeader({ category }) {
  switch (category) {
    case 'product':
      return (
        <>
          <th>name</th>
          <th>description</th>
          <th>weight</th>
          <th>price</th>
          <th>ingridients</th>
          <th>
            <img src={editIcon} alt="edit icon" />
          </th>
          <th>
            <img src={deleteIcon} alt="delete icon" />
          </th>
        </>
      );
    case 'instruction':
      return (
        <>
          <th>name</th>
          <th>difficulty</th>
          <th>time</th>
          <th>makes</th>
          <th>description</th>
          <th>ingredients</th>
          <th>text</th>
          <th>show in carousels</th>
          <th>
            <img src={editIcon} alt="edit icon" />
          </th>
          <th>
            <img src={deleteIcon} alt="delete icon" />
          </th>
        </>
      );
    case 'blog':
      return (
        <>
          <th>name</th>
          <th>text</th>
          <th>show place</th>
          <th>
            <img src={editIcon} alt="edit icon" />
          </th>
          <th>
            <img src={deleteIcon} alt="delete icon" />
          </th>
        </>
      );
    case 'order':
      return (
        <>
          <th>name</th>
          <th>phoneNumber</th>
          <th>address</th>
          <th>comment</th>
          <th>paymentType</th>
          <th>deliveryType</th>
          <th>totalAmount</th>
          <th>status</th>
          <th>
            <img src={editIcon} alt="edit icon" />
          </th>
          <th>
            <img src={deleteIcon} alt="delete icon" />
          </th>
        </>
      );
    case 'user':
      return (
        <>
          <th>name</th>
          <th>email</th>
          <th>
            <img src={editIcon} alt="edit icon" />
          </th>
          <th>
            <img src={deleteIcon} alt="delete icon" />
          </th>
        </>
      );
    default:
      return <th>Choose category</th>;
  }
}

export default RenderTableHeader;
