/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HtmlToReactParser from 'html-to-react';
import { Button } from 'react-bootstrap';
import { RiFolderZipFill, RiEdit2Line } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { IconContext } from 'react-icons';
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
function RenderTableBody({
  category,
  data,
  openConfirmDeleteModal,
  handleArchived,
}) {
  const Parser = new HtmlToReactParser.Parser();
  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

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

  const [selectedBlog, setSelectedBlog] = useState();

  const handleDisplay = (id) => {
    console.log(selectedBlog);
    console.log(id);
    if (selectedBlog === id) return setSelectedBlog(0);
    return setSelectedBlog(id);
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
                <Link to={`/edit/product/${product.id}`}>
                  <IconContext.Provider value={iconProviderValue}>
                    <RiEdit2Line />
                  </IconContext.Provider>
                </Link>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => openConfirmDeleteModal(product.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <MdDeleteForever />
                  </IconContext.Provider>
                </Button>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => handleArchived(product.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <RiFolderZipFill />
                  </IconContext.Provider>
                </Button>
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
                <Link to={`/edit/instruction/${recipe.id}`}>
                  <IconContext.Provider value={iconProviderValue}>
                    <RiEdit2Line />
                  </IconContext.Provider>
                </Link>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => openConfirmDeleteModal(recipe.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <MdDeleteForever />
                  </IconContext.Provider>
                </Button>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => handleArchived(recipe.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <RiFolderZipFill />
                  </IconContext.Provider>
                </Button>
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
                <span
                  style={
                    blog.id === selectedBlog
                      ? { display: 'block' }
                      : { display: '-webkit-box' }
                  }
                >
                  {Parser.parse(blog?.text)}
                </span>
                <Button onClick={() => handleDisplay(blog.id)}>
                  {blog.id === selectedBlog ? 'hide ' : 'show '}
                  text...
                </Button>
              </td>
              <td>
                <span>{blog.displayType}</span>
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/blog/${blog.id}`}>
                  <IconContext.Provider value={iconProviderValue}>
                    <RiEdit2Line />
                  </IconContext.Provider>
                </Link>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => openConfirmDeleteModal(blog.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <MdDeleteForever />
                  </IconContext.Provider>
                </Button>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => handleArchived(blog.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <RiFolderZipFill />
                  </IconContext.Provider>
                </Button>
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
                <span>{user.email}</span>
              </td>
              <td>
                {/* eslint-disable-next-line */}
                <Link to={`/edit/user/${user.id}`}>
                  <IconContext.Provider value={iconProviderValue}>
                    <RiEdit2Line />
                  </IconContext.Provider>
                </Link>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => openConfirmDeleteModal(user.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <MdDeleteForever />
                  </IconContext.Provider>
                </Button>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => handleArchived(user.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <RiFolderZipFill />
                  </IconContext.Provider>
                </Button>
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
                <Link to={`/edit/order/${order.id}`}>
                  <IconContext.Provider value={iconProviderValue}>
                    <RiEdit2Line />
                  </IconContext.Provider>
                </Link>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => openConfirmDeleteModal(order.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <MdDeleteForever />
                  </IconContext.Provider>
                </Button>
              </td>
              <td>
                <Button
                  className="button-icon"
                  onClick={() => handleArchived(order.id)}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <RiFolderZipFill />
                  </IconContext.Provider>
                </Button>
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
