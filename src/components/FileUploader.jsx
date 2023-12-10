import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./index";

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 6,
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center border border-gray-200 rounded-lg p-5 cursor-pointer">
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div>
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-lg object-cover object-top"
            />
          </div>
          <p className="text-sm text-gray-400 p-4 w-full text-center">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src="/file-upload.svg" alt="file upload" />
          <h3 className="text-gray-400 text-base mb-2 mt-4">Drag photo here</h3>
          <p className="text-gray-400 text-xs mb-6">SVG, PNG, JPG</p>
          <Button
            type="button"
            className={"h-12 px-5 text-sm"}
            bgColor="bg-gray-600">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
