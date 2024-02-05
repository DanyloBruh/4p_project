import React from 'react';
import { Link } from 'react-router-dom';
import { deleteData } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
function RenderTableBody({ category, data, setData, orders }) {
  const axiosPrivate = useAxiosPrivate();

  switch (category) {
    case 'product':
      return (
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.weight}</td>
              <td>{product.price}</td>
              <td>{product.ingredients}</td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  to={`/edit/product/${product.id}`}
                  className="button-edit"
                />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => {
                    deleteData(category, product.id, axiosPrivate).then(
                      setData((prevState) => prevState.filter((item) => item.id !== product.id)),
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    case 'instruction':
      return (
        <tbody>
          {data.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.difficulty}</td>
              <td>{recipe.time}</td>
              <td>{recipe.makes}</td>
              <td>{recipe.description}</td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.text}</td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  to={`/edit/instruction/${recipe.id}`}
                  className="button-edit"
                />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => {
                    deleteData(category, recipe.id, axiosPrivate).then(
                      setData((prevState) => prevState.filter((item) => item.id !== recipe.id)),
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    case 'blog':
      return (
        <tbody>
          {data.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.name}</td>
              <td>{blog.text}</td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/blog/${blog.id}`} className="button-edit" />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => {
                    deleteData(category, blog.id, axiosPrivate).then(
                      setData((prevState) => prevState.filter((item) => item.id !== blog.id)),
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    case 'user':
      return (
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/user/${user.id}`} className="button-edit" />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => {
                    deleteData(category, user.id, axiosPrivate).then(
                      setData((prevState) => prevState.filter((item) => item.id !== user.id)),
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    case 'order':
      return (
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
              <td>{order.comment}</td>
              <td>{order.paymentType}</td>
              <td>{order.deliveryType}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/order/${order.id}`} className="button-edit" />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => {
                    setData((prevState) => prevState.filter((item) => item.id !== order.id));
                    deleteData(category, order.id, axiosPrivate).then(
                      setData((prevState) => prevState.filter((item) => item.id !== order.id)),
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    default:
      return <tbody />;
  }
}

export default RenderTableBody;
