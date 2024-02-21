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
import { useSelector } from 'react-redux';
import {
  TableGenerator, handleArchived, handleDelete, handleUpdate,
} from '../adminUtils';
import AddBlog from './addBlog';
import EditBlog from './editBlog';
import './blog.scss';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function Blog({
  nodes,
  archived,
  theme,
  fileOptions,
}) {
  const [data, setData] = useState({ nodes });
  const axiosPrivate = useAxiosPrivate();
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

  const imageToFile = useCallback((imageObj) => {
    const sliceSize = 512;
    if (!imageObj.id) return imageObj;
    const byteCharacters = atob(imageObj.imageData);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: imageObj.imageType });
    const file = new File([blob], imageObj.imageName, {
      type: imageObj.imageType,
    });

    return file;
  }, []);

  const COLUMNS = useMemo(() => [
    {
      label: 'Name',
      renderCell: (item) => item.name,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'Display type',
      renderCell: (item) => (
        <select
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.displayType}
          onChange={(event) => handleUpdate(event.target.value, item.id, 'displayType', setData, 'blog', axiosPrivate)}
        >
          <option value="firstPage">firstPage</option>
          <option value="featured">featured</option>
          <option value="default">default</option>
        </select>
      ),
      sort: { sortKey: 'DISPLAYTYPE' },
    },
    {
      label: 'text',
      renderCell: (item) => (Parser.parse(item?.text).length > 0
        ? Parser.parse(item?.text)[0]
        : Parser.parse(item?.text)),
    },
    {
      label: 'Edit',
      renderCell: (item) => (
        <Button
          variant="dark"
          className="button-icon"
          onClick={() => {
            handeEdit(item);
          }}
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
          item={{ ...editItem, Images: editItem.Images.map(imageToFile) }}
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
