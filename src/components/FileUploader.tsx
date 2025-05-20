// import React from 'react';
// import { useDropzone } from 'react-dropzone';
// import IconFile from '@/components/Icon/IconFile';
// import IconX from '@/components/Icon/IconX';

// const FileUploader = ({ value = [], onChange, accept, maxFiles }) => {
//     const onDrop = (acceptedFiles) => {
//         const newFiles = acceptedFiles.map(file => ({
//             file,
//             preview: file.type.startsWith('image') ? URL.createObjectURL(file) : null,
//         }));
//         onChange([...value, ...newFiles]);
//     };

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop,
//         accept,
//         maxFiles,
//     });

//     const handleRemove = (index) => {
//         const updated = [...value];
//         updated.splice(index, 1);
//         onChange(updated);
//     };

//     return (
//         <div>
//             <div
//                 {...getRootProps()}
//                 className="border-dashed border-2 border-gray-300 p-4 rounded cursor-pointer hover:border-blue-500"
//             >
//                 <input {...getInputProps()} />
//                 <p className="text-sm text-gray-500 flex items-center gap-1">
//                     <IconFile className="w-4 h-4" /> Drag and drop or click to upload
//                 </p>
//                 <p className="text-xs text-gray-400">Accepted: images, pdf, xlsx, csv</p>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-3 grid-cols-1 mt-4">
//                 {value.map((fileObj, index) => (
//                     <div key={index} className="relative border rounded p-2 bg-white shadow-sm">
//                         {fileObj.preview ? (
//                             <img src={fileObj.preview} alt="preview" className="w-full h-32 object-cover rounded" />
//                         ) : (
//                             <div className="text-sm">{fileObj.file.name}</div>
//                         )}
//                         <button
//                             type="button"
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
//                             onClick={() => handleRemove(index)}
//                         >
//                             <IconX className=''/>
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FileUploader;

import React from 'react';
import { useDropzone } from 'react-dropzone';
import IconFile from '@/components/Icon/IconFile';
import IconX from '@/components/Icon/IconX';

const FileUploader = ({ value = [], onChange, accept, maxFiles }) => {
    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            preview: file.type.startsWith('image') ? URL.createObjectURL(file) : '',
            name: file.name,
        }));
        onChange([...value, ...newFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
        maxFiles,
    });

    const handleRemove = (index) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const getFileExtension = (name = '') => {
        const parts = name.split('.');
        return parts.length > 1 ? parts.pop().toLowerCase() : '';
    };

    const renderFilePreview = (fileObj) => {
        const extension = getFileExtension(fileObj.name || fileObj.preview);
        if (fileObj.preview && ['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
            return <img src={fileObj.preview} alt="preview" className="w-full h-32 object-cover rounded" />;
        } else {
            return <div className="text-sm">{fileObj.name || 'Uploaded file'}</div>;
        }
    };

    return (
        <div>
            <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded cursor-pointer hover:border-blue-500">
                <input {...getInputProps()} />
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    <IconFile className="w-4 h-4" /> Drag and drop or click to upload
                </p>
                <p className="text-xs text-gray-400">Accepted: images, pdf, xlsx, csv</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1 mt-4">
                {value.map((fileObj, index) => (
                    <div key={index} className="relative border rounded p-2 bg-white shadow-sm">
                        {/* {fileObj.preview ? (
                            <img src={fileObj.preview} alt="preview" className="w-full h-32 object-cover rounded" />
                        ) : (
                            <div className="text-sm truncate">{fileObj.name || 'Uploaded file'}</div>
                        )} */}
                        {renderFilePreview(fileObj)}
                        <button type="button" className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full" onClick={() => handleRemove(index)}>
                            <IconX />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploader;
