import { useState } from "react";

export default function MultiFileUpload() {
  const [files, setFiles] = useState([]);
  console.log("files: ", files);
  const handleMultiFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDeleteFiles = (id) => {
    const updatedFiles = files.filter((item) => item.name !== id);
    setFiles(updatedFiles);
  };
  return (
    <>
      <input type="file" multiple onChange={handleMultiFiles} />
      <div>
        {files?.map((file, i) => (
          <>
            <div key={i}>{file.name} </div>
            <button onClick={() => handleDeleteFiles(file.name)}>x</button>
          </>
        ))}
      </div>
    </>
  );
}
