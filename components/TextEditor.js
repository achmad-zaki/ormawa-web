// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function TextEditor({ name, value, onChange, className, placeholder }) {
  const handleEditorChange = (content) => {
    onChange({ target: { name, value: content } });
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleEditorChange}
      className={className}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
      ]}
      placeholder={placeholder}
    />
  );
}
