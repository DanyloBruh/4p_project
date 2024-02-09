/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './TextArticle.scss';
import moment from 'moment';
import { Placeholder } from 'react-bootstrap';

function TextArticle({ data }) {
  console.log(data);
  return (
    <div className="text-article__content">
      <h2>Featured Posts</h2>
      <hr />
      {data
        && data.map((blog) => (
          <Link key={blog.id} to={`/blog/${blog.id}`}>
            <div className="text-article__post">
              <h2>{blog.name}</h2>
              <div>
                <p>{blog.User.name}</p>
                <p>{moment(blog?.createdAt).format('DD/MM/YY')}</p>
              </div>
            </div>
          </Link>
        ))}

      {!data && (
        <>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
          <div className="text-article__placeholder">
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={2} />
              </Placeholder>
            </h2>
            <div>
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={2} />
                </Placeholder>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TextArticle;
