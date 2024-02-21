/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { Button, Pagination } from 'react-bootstrap';
import { CompactTable } from '@table-library/react-table-library/compact';
import { archivedData, deleteData, editDataConfig } from '../../Helper/requests';
import confirm from '../../Components/ConfirmModel/ConfirmModel';
import ToastNotification from '../../Components/Toast/Toast';

export const handleArchived = async (
  archivedId,
  archived,
  axiosPrivate,
  category,
  setData,
) => {
  const message = archived
    ? 'Are you sure you want to unzip?'
    : 'Are you sure you want to zip?';
  if (await confirm(message)) {
    archivedData(category, archivedId, axiosPrivate, {
      archived: !archived,
    })
      .then(() => {
        const mess = archived ? 'unzipped' : 'zipped';
        ToastNotification('success', `Successfully ${mess}!`);
        setData((state) => ({
          nodes: state.nodes.filter((item) => item.id !== archivedId),
        }));
      })
      .catch((err) => {
        ToastNotification(
          'error',
          `Something went wrong! (${err.response.data.message})`,
        );
      });
  }
};

export const handleDelete = async (id, axiosPrivate, category, setData) => {
  if (await confirm('Are your sure?')) {
    deleteData(category, id, axiosPrivate)
      .then(() => {
        ToastNotification('success', 'Successfully deleted!');
        setData((state) => ({
          nodes: state.nodes.filter((item) => item.id !== id),
        }));
      })
      .catch((err) => {
        ToastNotification(
          'error',
          `Something went wrong! (${err.response.data.message})`,
        );
      });
  }
};

export function TableGenerator({
  columns,
  data,
  theme,
  sort,
  pagination,
  addClick,
  archived,
  addDisable = false,
}) {
  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const tableSize = data.nodes.length > 0;
  const sizes = [5, 10, 15];

  useEffect(() => {
    pagination.fns.onSetPage(0);
  }, [archived]);

  return (
    <div className="admin-table">
      {tableSize && (
      <CompactTable
        columns={columns}
        data={data}
        theme={theme}
        sort={sort}
        pagination={pagination}
        layout={{ custom: true, horizontalScroll: true }}
      />
      )}

      <div style={{ display: 'flex', justifyContent: !tableSize ? 'center' : 'space-between' }}>
        {data.nodes.length > 0 && (
          <span>
            Page Size:
            <Pagination>
              {sizes.map((size, index) => (
                <Pagination.Item
                // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  active={pagination.state.size === size}
                  onClick={() => pagination.fns.onSetSize(size)}
                >
                  {size}
                </Pagination.Item>
              ))}
              <Pagination.Item
              // eslint-disable-next-line react/no-array-index-key
                key={data.nodes.length}
                active={pagination.state.size === data.nodes.length}
                onClick={() => pagination.fns.onSetSize(data.nodes.length)}
              >
                All
              </Pagination.Item>
            </Pagination>
          </span>
        )}

        {!addDisable && (
          <Button
            variant="dark"
            className="button-icon"
            onClick={() => addClick()}
          >
            <IconContext.Provider value={iconProviderValue}>
              <IoIosAddCircle />
            </IconContext.Provider>
          </Button>
        )}
        {data.nodes.length === 0 && (
          <h2 className="text-white">Nothing found</h2>
        )}
        {tableSize > 0 && (
          <span>
            Page:
            <Pagination>
              {pagination.state.getPages(data.nodes).map((_, index) => (
                <Pagination.Item
                // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  active={pagination.state.page === index}
                  onClick={() => pagination.fns.onSetPage(index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </span>
        )}

      </div>
    </div>
  );
}

export function removeUnchangedFields(originalData, modifiedData) {
  const newData = { ...modifiedData };

  Object.keys(originalData).forEach((key) => {
    if (
      Object.prototype.hasOwnProperty.call(originalData, key)
      && Object.prototype.hasOwnProperty.call(newData, key)
    ) {
      if (originalData[key] === newData[key]) {
        delete newData[key];
      }
    }
  });

  return newData;
}

export const handleUpdate = (
  value,
  id,
  property,
  setData,
  tableName,
  axiosPrivate,
) => {
  editDataConfig(tableName, id, axiosPrivate, {
    [property]: value,
  })
    .then(() => {
      ToastNotification('success', `${property} successfully updated!`);
      setData((state) => ({
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, [property]: value };
          }
          return node;
        }),
      }));
    })
    .catch((err) => {
      ToastNotification(
        'error',
        `Something went wrong! (${err.response.data.message})`,
      );
    });
};
