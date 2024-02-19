/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import { CompactTable } from '@table-library/react-table-library/compact';
import { archivedData, deleteData } from '../../Helper/requests';
import ToastNotification from '../../Components/Toast/Toast';
import confirm from '../../Components/ConfirmModel/ConfirmModel';

export const handleArchived = async (
  archivedId,
  archived,
  axiosPrivate,
  category,
  setData,
) => {
  const message = archived
    ? 'Are you sure you want to unzip?' : 'Are you sure you want to zip?';
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

export const handleDelete = async (
  id,
  axiosPrivate,
  category,
  setData,
) => {
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
  addDisable = false,
}) {
  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  return (
    <>
      <CompactTable
        columns={columns}
        data={data}
        theme={theme}
        sort={sort}
        pagination={pagination}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          Total Pages:
          {pagination.state.getTotalPages(data.nodes)}
        </span>

        {!addDisable && (
        <Button
          className="button-icon"
          onClick={() => addClick()}
        >
          <IconContext.Provider value={iconProviderValue}>
            <IoIosAddCircle />
          </IconContext.Provider>
        </Button>
        )}

        <span>
          Page:
          {' '}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
    </>
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
