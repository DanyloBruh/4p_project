/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback,
  useEffect, useMemo, useState,
} from 'react';

import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import { RiFolderZipFill, RiEdit2Line } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import { TableGenerator, handleArchived, handleDelete } from '../adminUtils';
import AddProduct from './addProduct';
import EditProduct from './editProduct';

function Product({
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
    {
    },
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        WEIGHT: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        PRICE: (array) => array.sort((a, b) => a.price - b.price),
      },
    },
  );

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 4,
    },
  });

  const handeEdit = useCallback((item) => {
    setManipulation(false);
    setVisibleType('edit');
    setEditItem(item);
  }, []);

  const COLUMNS = useMemo(() => [
    {
      label: 'Name',
      renderCell: (item) => item.name,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'Weight',
      renderCell: (item) => item.weight,
      sort: { sortKey: 'WEIGHT' },
    },
    {
      label: 'Price',
      renderCell: (item) => item.price,
      sort: { sortKey: 'PRICE' },
    },
    {
      label: 'Ingredients',
      renderCell: (item) => item.ingredients,
    },
    {
      label: 'Description',
      renderCell: (item) => item.description,
    },
    {
      label: 'Edit',
      renderCell: (item) => (
        <Button
          className="button-icon"
          onClick={() => handeEdit(item)}
        >
          <IconContext.Provider value={iconProviderValue}>
            <RiEdit2Line />
          </IconContext.Provider>
        </Button>
      ),
    },
    {
      label: 'Zip/Unzip',
      renderCell: (item) => (
        <Button
          className="button-icon"
          onClick={() => handleArchived(
            item.id,
            archived,
            axiosPrivate,
            'product',
            setData,
          )}
        >
          <IconContext.Provider value={iconProviderValue}>
            <RiFolderZipFill />
          </IconContext.Provider>
        </Button>
      ),
    },
    {
      label: 'Delete',
      renderCell: (item) => (
        <Button
          className="button-icon"
          onClick={() => handleDelete(
            item.id,
            axiosPrivate,
            'product',
            setData,
          )}
        >
          <IconContext.Provider value={iconProviderValue}>
            <MdDeleteForever />
          </IconContext.Provider>
        </Button>
      ),
    },
  ], [archived]);

  const close = useCallback(() => {
    setManipulation(true);
    setVisibleType('');
  }, []);

  return (
    visibleType === 'add'
      ? <AddProduct setData={setData} fileOptions={fileOptions} close={close} />
      : visibleType === 'edit'
        ? (
          <EditProduct
            item={editItem}
            setData={setData}
            fileOptions={fileOptions}
            close={close}
          />
        )
        : (
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
          />
        )
  );
}

export default Product;
