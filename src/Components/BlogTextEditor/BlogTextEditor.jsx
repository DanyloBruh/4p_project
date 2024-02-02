// Importing helper modules
/* eslint-disable object-curly-newline */
import React, { useMemo, useRef } from 'react';

import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BlogTextEditor.scss';

/* eslint-disable react/prop-types */
function BlogTextEditor({ text, handleInputChange }) {
  // Editor state

  const quill = useRef();

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  }));

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'clean',
  ];

  return (
    <QuillEditor
      className="editor"
      ref={(el) => {
        quill.current = el;
      }}
      theme="snow"
      value={text}
      formats={formats}
      modules={modules}
      onChange={handleInputChange}
    />
  );
}

export default BlogTextEditor;
