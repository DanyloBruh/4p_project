/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import { RiFolderZipFill, RiEdit2Line } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import {
  TableGenerator, handleArchived, handleDelete, handleUpdate,
} from '../adminUtils';
import EditOrder from './editOrder';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function Order({
  nodes,
  archived,
  theme,
  fileOptions,
}) {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState({ nodes });
  const [visibleType, setVisibleType] = useState('');
  const [editItem, setEditItem] = useState();

  useEffect(() => {
    setData((state) => ({ nodes }));
  }, [nodes]);

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const sort = useSort(
    data,
    {},
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        TOTALAMOUNT: (array) => array.sort((a, b) => a.totalAmount - b.totalAmount),
        CREATEDAT: (array) => array.sort((a, b) => a.price - b.price),
        UPDATEDAT: (array) => array.sort((a, b) => a.price - b.price),
        STATUS: (array) => array.sort((a, b) => a.status.localeCompare(b.status)),
        PAYMENTTYPE: (array) => array.sort((a, b) => a.paymentType.localeCompare(b.paymentType)),
        DELIVERYTYPE: (array) => array.sort((a, b) => a.deliveryType.localeCompare(b.deliveryType)),
      },
    },
  );

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
  });

  const handeEdit = useCallback((item) => {
    setVisibleType('edit');
    setEditItem(item);
  }, []);

  const formatDate = useCallback((dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }, []);

  const COLUMNS = useMemo(
    () => [
      {
        label: 'Name',
        renderCell: (item) => item.name,
        sort: { sortKey: 'NAME' },
      },
      {
        label: 'Phone number',
        renderCell: (item) => item.phoneNumber,
      },
      {
        label: 'Address',
        renderCell: (item) => item.adress,
      },
      {
        label: 'Comment',
        renderCell: (item) => item.comment,
      },
      {
        label: 'Status',
        renderCell: (item) => (
          <select
            style={{
              width: '100%',
              fontSize: '1rem',
              margin: 0,
            }}
            value={item.status}
            onChange={(event) => handleUpdate(event.target.value, item.id, 'status', setData, 'order', axiosPrivate)}
          >
            <option value="ordered, not processed">Ordered, not processed</option>
            <option value="ordered, processed">Ordered, processed</option>
            <option value="courier on the way">Courier on the way</option>
            <option value="delivered">Delivered</option>
            <option value="requires processing">Requires processing</option>
          </select>
        ),
        sort: { sortKey: 'STATUS' },
      },
      {
        label: 'Delivery type',
        renderCell: (item) => (
          <select
            style={{
              width: '100%',
              fontSize: '1rem',
              margin: 0,
            }}
            value={item.deliveryType}
            onChange={(event) => handleUpdate(event.target.value, item.id, 'deliveryType', setData, 'order', axiosPrivate)}
          >
            <option value="self">Self</option>
            <option value="courier">Courier</option>
          </select>
        ),
        sort: { sortKey: 'DELIVERYTYPE' },
      },
      {
        label: 'Payment type',
        renderCell: (item) => (
          <select
            style={{
              width: '100%',
              fontSize: '1rem',
              margin: 0,
            }}
            value={item.paymentType}
            onChange={(event) => handleUpdate(event.target.value, item.id, 'paymentType', setData, 'order', axiosPrivate)}
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
          </select>
        ),
        sort: { sortKey: 'PAYMENTTYPE' },
      },
      {
        label: 'Create at',
        renderCell: (item) => formatDate(item.createdAt),
        sort: { sortKey: 'CREATEAT' },
      },
      {
        label: 'Update at',
        renderCell: (item) => formatDate(item.updatedAt),
        sort: { sortKey: 'UPDATEAT' },
      },
      {
        label: 'Edit',
        renderCell: (item) => (
          <Button
            variant="dark"
            className="button-icon"
            onClick={() => handeEdit(item)}
          >
            <IconContext.Provider value={iconProviderValue}>
              <RiEdit2Line />
            </IconContext.Provider>
          </Button>
        ),
        pinRight: true,
      },
      {
        label: 'Zip/Unzip',
        renderCell: (item) => (
          <Button
            variant="dark"
            className="button-icon"
            onClick={() => handleArchived(item.id, archived, axiosPrivate, 'order', setData)}
          >
            <IconContext.Provider value={iconProviderValue}>
              <RiFolderZipFill />
            </IconContext.Provider>
          </Button>
        ),
        pinRight: true,
      },
      {
        label: 'Delete',
        renderCell: (item) => (
          <Button
            variant="dark"
            className="button-icon"
            onClick={() => handleDelete(item.id, axiosPrivate, 'order', setData)}
          >
            <IconContext.Provider value={iconProviderValue}>
              <MdDeleteForever />
            </IconContext.Provider>
          </Button>
        ),
        pinRight: true,
      },
    ],
    [archived],
  );

  const close = useCallback(() => {
    setVisibleType('');
  }, []);

  return (
    <>
      {visibleType === 'edit' && (
        <EditOrder
          item={editItem}
          setData={setData}
          fileOptions={fileOptions}
          close={close}
        />
      )}
      {data.nodes.length > 0 && (
        <TableGenerator
          columns={COLUMNS}
          data={data}
          theme={theme}
          sort={sort}
          pagination={pagination}
          addClick={() => {
            setVisibleType('add');
          }}
          addDisable
        />
      )}
    </>
  );
}

export default Order;
