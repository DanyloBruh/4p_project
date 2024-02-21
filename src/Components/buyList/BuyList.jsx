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
import { onScroll } from '../../redux/scrollSlice';

function BuyList() {
  const activeOrder = useSelector((state) => state.orderData.visible);
  const orderRed = useSelector((state) => state.orderData.data);
  const [orders, setOrders] = useState([]);
  const dispath = useDispatch();

  useEffect(() => {
    setOrders(orderRed);
    if (orderRed.length === 0) {
      dispath(setVisible(false));
      dispath(onScroll());
    }
  }, [orderRed]);

  const getTotalAmount = useCallback(() => {
    if (orders.length) {
      return orders.reduce(
        (pre, curr) => pre + +curr.product.price * curr.count,
        0,
      );
    }

    return '0';
  }, [orders]);

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
    <div>
      {orders.length > 0 && (
        <>
          <div className="buyContainer">
            <div className="buyHover">{`= ${getTotalAmount()} £`}</div>
            <div className="buyList" onClick={handleClickOrder}>
              <span className="buyList__text">{deliveryCount()}</span>
            </div>
          </div>
          {activeOrder && (
            <Order
              setOrderVisibleFalse={() => {
                dispath(setVisible(false));
                dispath(onScroll());
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
