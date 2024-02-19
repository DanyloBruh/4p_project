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
import { TableGenerator, handleArchived, handleDelete } from '../adminUtils';
import EditOrder from './editOrder';

function Order({
  nodes,
  archived,
  axiosPrivate,
  theme,
  fileOptions,
  setManipulation,
}) {
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
    setManipulation(false);
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
        label: 'Delivery type',
        renderCell: (item) => item.deliveryType,
        sort: { sortKey: 'DELIVERYTYPE' },
      },
      {
        label: 'Payment type',
        renderCell: (item) => item.paymentType,
        sort: { sortKey: 'PAYMENTTYPE' },
      },
      {
        label: 'Status',
        renderCell: (item) => item.status,
        sort: { sortKey: 'STATUS' },
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
    setManipulation(true);
    setVisibleType('');
  }, []);

  return visibleType === 'edit' ? (
    <EditOrder
      item={editItem}
      setData={setData}
      fileOptions={fileOptions}
      close={close}
    />
  ) : (
    <TableGenerator
      columns={COLUMNS}
      data={data}
      theme={theme}
      sort={sort}
      pagination={pagination}
      addClick={() => {
        setVisibleType('add');
        setManipulation(false);
      }}
      addDisable
    />
  );
}

export default Order;
