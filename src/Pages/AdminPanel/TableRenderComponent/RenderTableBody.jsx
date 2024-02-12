/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */

import React from 'react';
import { Link } from 'react-router-dom';
import HtmlToReactParser from 'html-to-react';
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
function RenderTableBody({ category, data, openConfirmDeleteModal }) {
  const Parser = new HtmlToReactParser.Parser();

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getOrderColor = (status) => {
    switch (status) {
      case 'ordered, not processed':
        return 'newOrder';
      case 'ordered, processed':
        return 'processed';
      case 'courier on the way':
        return 'onWay';
      case 'delivered':
        return 'delivered';
      case 'requires processing':
        return 'requiresProcessing';
      default:
        return '';
    }
  };

  switch (category) {
    case 'product':
      return (
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>
                <span>{product.name}</span>
              </td>
              <td>
                <span>{product.description}</span>
              </td>
              <td>
                <span>{product.weight}</span>
              </td>
              <td>
                <span>{product.price}</span>
              </td>
              <td>
                <span>{product.ingredients}</span>
              </td>
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
                  onClick={() => openConfirmDeleteModal(product.id)}
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
              <td>
                <span>{recipe.name}</span>
              </td>
              <td>
                <span>{recipe.difficulty}</span>
              </td>
              <td>
                <span>{recipe.time}</span>
              </td>
              <td>
                <span>{recipe.makes}</span>
              </td>
              <td>
                <span>{recipe.description}</span>
              </td>
              <td>
                <span>{recipe.ingredients}</span>
              </td>
              <td>
                <span>{recipe.text}</span>
              </td>
              <td>
                <span>{recipe.carrousel ? 'yes' : 'no'}</span>
              </td>
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
                  onClick={() => openConfirmDeleteModal(recipe.id)}
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
              <td>
                <span>{blog.name}</span>
              </td>
              <td className="blog-text">
                <span>{Parser.parse(blog?.text)}</span>
              </td>
              <td>
                <span>{blog.displayType}</span>
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/blog/${blog.id}`} className="button-edit" />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => openConfirmDeleteModal(blog.id)}
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
              <td>
                <span>{user.name}</span>
              </td>
              <td>
                <span>
                  {user.email}
                </span>
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/user/${user.id}`} className="button-edit" />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => openConfirmDeleteModal(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    case 'order':
      return (
        <tbody>
          {data.map((order) => (
            <tr key={order.id} className={getOrderColor(order.status)}>
              <td>
                <span>{order.name}</span>
              </td>
              <td>
                <span>{order.phoneNumber}</span>
              </td>
              <td>
                <span>{order.adress}</span>
              </td>
              <td>
                <span>{order.comment}</span>
              </td>
              <td>
                <span>{order.paymentType}</span>
              </td>
              <td>
                <span>{order.deliveryType}</span>
              </td>
              <td>
                <span>{order.totalAmount}</span>
              </td>
              <td>
                <span>{order.status}</span>
              </td>
              <td>
                <span>{formatDate(order.createdAt)}</span>
              </td>
              <td>
                <span>{formatDate(order.updatedAt)}</span>
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/order/${order.id}`} className="button-edit" />
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link
                  className="button-delete"
                  onClick={() => openConfirmDeleteModal(order.id)}
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
