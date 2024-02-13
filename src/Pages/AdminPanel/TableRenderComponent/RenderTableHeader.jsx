/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import { RiFolderZipFill, RiEdit2Line } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { IconContext } from 'react-icons';

/* eslint-disable react/prop-types */
function RenderTableHeader({ category }) {
  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);
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
            <IconContext.Provider value={iconProviderValue}>
              <RiEdit2Line />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <MdDeleteForever />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiFolderZipFill />
            </IconContext.Provider>
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
            <IconContext.Provider value={iconProviderValue}>
              <RiEdit2Line />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <MdDeleteForever />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiFolderZipFill />
            </IconContext.Provider>
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
            <IconContext.Provider value={iconProviderValue}>
              <RiEdit2Line />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <MdDeleteForever />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiFolderZipFill />
            </IconContext.Provider>
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
          <th>createdAt</th>
          <th>updatedAt</th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiEdit2Line />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <MdDeleteForever />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiFolderZipFill />
            </IconContext.Provider>
          </th>
        </>
      );
    case 'user':
      return (
        <>
          <th>name</th>
          <th>email</th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiEdit2Line />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <MdDeleteForever />
            </IconContext.Provider>
          </th>
          <th>
            <IconContext.Provider value={iconProviderValue}>
              <RiFolderZipFill />
            </IconContext.Provider>
          </th>
        </>
      );
    default:
      return <th>Choose category</th>;
  }
}

export default RenderTableHeader;
