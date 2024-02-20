/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import HtmlToReactParser from 'html-to-react';
import { RiFolderZipFill, RiEdit2Line } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import { TableGenerator, handleArchived, handleDelete } from '../adminUtils';
import AddBlog from './addBlog';
import EditBlog from './editBlog';
import './blog.scss';

function Blog({
  nodes, archived, axiosPrivate, theme, fileOptions,
}) {
  const [data, setData] = useState({ nodes });
  const [visibleType, setVisibleType] = useState('');
  const [editItem, setEditItem] = useState();

  const Parser = new HtmlToReactParser.Parser();

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
        DISPLAYTYPE: (array) => array.sort((a, b) => a.displayType.localeCompare(b.displayType)),
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

  const COLUMNS = useMemo(() => [
    {
      label: 'Name',
      renderCell: (item) => item.name,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'text',
      renderCell: (item) => (Parser.parse(item?.text).length > 0
        ? Parser.parse(item?.text)[0]
        : Parser.parse(item?.text)),
    },
    {
      label: 'Display type',
      renderCell: (item) => item.displayType,
      sort: { sortKey: 'DISPLAYTYPE' },
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
          onClick={() => handleArchived(item.id, archived, axiosPrivate, 'blog', setData)}
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
          onClick={() => handleDelete(item.id, axiosPrivate, 'blog', setData)}
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
    setVisibleType('');
  }, []);

  return (
    <>
      {visibleType === 'add' && (
        <AddBlog setData={setData} fileOptions={fileOptions} close={close} />
      )}
      {visibleType === 'edit' && (
        <EditBlog
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
        />
      )}
    </>
  );
}

export default Blog;
