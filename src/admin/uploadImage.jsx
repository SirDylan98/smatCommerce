import { useState } from "react";
import axios from "axios";

function UploadProductImage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8086/api/v1/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Set the uploaded image path
      setImageUrl(response.data.filePath);
      console.log("This is the file data "+response.data.filePath)
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={`http://localhost:8086/api/v1/products/uploads/${imageUrl}`} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
}

export default UploadProductImage;
