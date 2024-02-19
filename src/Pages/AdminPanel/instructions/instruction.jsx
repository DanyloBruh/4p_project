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
import AddInstruction from './addInstruction';
import EditInstruction from './editInstruction';

function Instruction({
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
        DIFFICULTY: (array) => array.sort((a, b) => a.difficulty.localeCompare(b.difficulty)),
        MAKES: (array) => array.sort((a, b) => a.makes - b.makes),
        CARROUSEL: (array) => array.sort((a, b) => a.carrousel.localeCompare(b.carrousel)),
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

  const COLUMNS = useMemo(() => [
    {
      label: 'Name',
      renderCell: (item) => item.name,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'Difficulty',
      renderCell: (item) => item.difficulty,
      sort: { sortKey: 'DIFFICULTY' },
    },
    {
      label: 'Time',
      renderCell: (item) => item.time,
    },
    {
      label: 'Makes',
      renderCell: (item) => item.makes,
      sort: { sortKey: 'MAKES' },
    },
    {
      label: 'Carrousel',
      renderCell: (item) => (item.carrousel ? 'Show' : 'Hide'),
      sort: { sortKey: 'CARROUSEL' },
    },
    {
      label: 'Description',
      renderCell: (item) => item.description,
    },
    {
      label: 'Ingredients',
      renderCell: (item) => item.ingredients,
    },
    {
      label: 'Steps',
      renderCell: (item) => item.text,
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
          onClick={() => handleArchived(
            item.id,
            archived,
            axiosPrivate,
            'instruction',
            setData,
          )}
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
          onClick={() => handleDelete(
            item.id,
            axiosPrivate,
            'instruction',
            setData,
          )}
        >
          <IconContext.Provider value={iconProviderValue}>
            <MdDeleteForever />
          </IconContext.Provider>
        </Button>
      ),
      pinRight: true,
    },
  ], [archived]);

  const close = useCallback(() => {
    setManipulation(true);
    setVisibleType('');
  }, []);

  return (
    visibleType === 'add'
      ? <AddInstruction setData={setData} fileOptions={fileOptions} close={close} />
      : visibleType === 'edit'
        ? (
          <EditInstruction
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

export default Instruction;
