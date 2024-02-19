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
import EditUser from './edituser';
import AddUser from './addUser';

function User({
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
        ROLE: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        EMAIL: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
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
      label: 'Role',
      renderCell: (item) => item.role,
      sort: { sortKey: 'ROLE' },
    },
    {
      label: 'Email',
      renderCell: (item) => item.email,
      sort: { sortKey: 'EMAIL' },
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
            'user',
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
            'user',
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
      ? <AddUser setData={setData} fileOptions={fileOptions} close={close} />
      : visibleType === 'edit'
        ? (
          <EditUser
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

export default User;