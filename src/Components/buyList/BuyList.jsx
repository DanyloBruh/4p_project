/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BuyList.scss';
import Order from '../Order/Order';
import {
  addCountData,
  decCountData,
  deleteItem,
  setVisible,
} from '../../redux/orderDataSlice';

function BuyList() {
  const activeOrder = useSelector((state) => state.orderData.visible);
  const orderRed = useSelector((state) => state.orderData.data);
  const [orders, setOrders] = useState([]);
  const dispath = useDispatch();

  useEffect(() => {
    setOrders(orderRed);
  }, [orderRed]);

  useEffect(() => {
    setOrders(orderRed);
  }, []);

  const handleClickOrder = () => {
    dispath(setVisible(true));
  };

  const deleteProduct = (ProdId) => {
    dispath(deleteItem(ProdId));
  };

  const incCount = (ProdId) => {
    dispath(addCountData(ProdId));
  };

  const decCount = (ProdId) => {
    dispath(decCountData(ProdId));
  };
  const deliveryCount = useCallback(() => {
    if (orders.length) {
      return orders.reduce((pre, curr) => pre + curr.count, 0);
    }

    return '0';
  }, [orders]);

  return (
    <div className="dsfsdfd">
      {orders.length > 0 && (
        <>
          <div className="buyList" onClick={handleClickOrder}>
            <span className="buyList__text">{deliveryCount()}</span>
          </div>
          {activeOrder && (
            <Order
              setOrderVisibleFalse={() => {
                dispath(setVisible(false));
              }}
              productDedux={orders}
              deleteProduct={deleteProduct}
              decCount={decCount}
              incCount={incCount}
            />
          )}
        </>
      )}
    </div>
  );
}

export default BuyList;
