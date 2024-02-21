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
import { useSelector } from 'react-redux';
import {
  TableGenerator, handleArchived, handleDelete, handleUpdate,
} from '../adminUtils';
import AddInstruction from './addInstruction';
import EditInstruction from './editInstruction';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function Instruction({
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
        DIFFICULTY: (array) => array.sort((a, b) => a.difficulty.localeCompare(b.difficulty)),
        MAKES: (array) => array.sort((a, b) => a.makes - b.makes),
        CARROUSEL: (array) => array.sort(
          (a, b) => ((a.carrousel === b.carrousel) ? 0 : a.carrousel ? -1 : 1),
        ),
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

  const COLUMNS = useMemo(
    () => [
      {
        label: 'Name',
        renderCell: (item) => item.name,
        sort: { sortKey: 'NAME' },
      },
      {
        label: 'Difficulty',
        renderCell: (item) => (
          <select
            style={{
              width: '100%',
              border: 'none',
              fontSize: '1rem',
              padding: 0,
              margin: 0,
            }}
            value={item.difficulty}
            onChange={(event) => handleUpdate(event.target.value, item.id, 'difficulty', setData, 'instruction', axiosPrivate)}
          >
            <option value="Very easy">Very easy</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Very hard">Very hard</option>
          </select>
        ),
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
        renderCell: (item) => (
          <select
            style={{
              width: '100%',
              border: 'none',
              fontSize: '1rem',
              padding: 0,
              margin: 0,
            }}
            value={item.carrousel}
            onChange={(event) => handleUpdate(event.target.value, item.id, 'carrousel', setData, 'instruction', axiosPrivate)}
          >
            <option value="true">Show</option>
            <option value="false">Hide</option>
          </select>
        ),
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
            onClick={() => handleDelete(item.id, axiosPrivate, 'instruction', setData, axiosPrivate)}
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
      {visibleType === 'add' && (
        <AddInstruction
          setData={setData}
          fileOptions={fileOptions}
          close={close}
        />
      )}
      {visibleType === 'edit' && (
        <EditInstruction
          item={editItem}
          setData={setData}
          fileOptions={fileOptions}
          close={close}
        />
      )}
      <TableGenerator
        columns={COLUMNS}
        data={data}
        theme={theme}
        sort={sort}
        pagination={pagination}
        addClick={() => {
          setVisibleType('add');
        }}
      />
    </>
  );
}

export default Instruction;
