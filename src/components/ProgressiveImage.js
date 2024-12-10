import React, { useState, useEffect } from "react";
const ProgressiveImage = ({ alt }) => {
  const [showHighRes, setShowHighRes] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [lowImageSrc, setLowImageSrc] = useState("");
  const [highImageSrc, setHighImageSrc] = useState("");
  const [error, setError] = useState(false);
  const [networkType, setNetworkType] = useState("2g");
  const [size, setSize] = useState({
    width: "220",
    height: "220",
    quality: "10",
  });
  const qualityMapping = {
    "2g": 10,
    "3g": 50,
    "4g": 100,
  };
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/dynamicImage/${size.width}/${size.height}/${size.quality}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setLowImageSrc(data.lowQualityImage);
      setHighImageSrc(data.highQualityImage);
      setImageSrc(data.lowQualityImage);
      setError(false);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(true);
    }
  };
  useEffect(() => {
    fetchImages();
    setShowHighRes(false);
  }, [size]);
  const handleImageClick = () => {
    if (!showHighRes) {
      setImageSrc(highImageSrc);
      setShowHighRes(true);
    }
  };
  const handleNetworkChange = (e) => {
    const selectedNetwork = e.target.value;
    setNetworkType(selectedNetwork);
    setSize({ ...size, quality: qualityMapping[selectedNetwork] });
  };
  return (
    <div>
      <div
        style={{
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {error ? (
          <p>Backend not responding</p>
        ) : (
          <img
            src={imageSrc}
            alt={alt}
            onClick={handleImageClick}
            style={{
              cursor: showHighRes ? "default" : "pointer",
            }}
          />
        )}
        {!showHighRes && !error && (
          <p>Click the image to load the high-resolution version.</p>
        )}
      </div>
      <div
        style={{
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>Current speed of network: {networkType}</h4>
        {!showHighRes && !error && (
          <p>Click the image to load the high-resolution version.</p>
        )}
        <p>
          Implement backend api for getting Dynamic size and quality of images
        </p>
        <p>
          Implemented for Low end devices and slow internet connection problem
        </p>
      </div>
      <div
        style={{
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          gap: 15,
        }}
      >
        <label htmlFor="width">Width</label>
        <input
          value={size.width}
          name="width"
          type="number"
          onChange={(e) => {
            setSize({ ...size, width: e.target.value });
          }}
          placeholder="Enter Width"
        />
        <label htmlFor="height">Height</label>
        <input
          name="height"
          type="number"
          value={size.height}
          placeholder="Enter Height"
          onChange={(e) => {
            setSize({ ...size, height: e.target.value });
          }}
        />
        <label htmlFor="networkType">Network Type</label>
        <select
          name="networkType"
          value={networkType}
          style={{ width: "5rem" }}
          onChange={handleNetworkChange}
        >
          <option value="2g">2G</option>
          <option value="3g">3G</option>
          <option value="4g">4G</option>
        </select>
        <button
          onClick={fetchImages}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007367",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Load Image
        </button>
      </div>
    </div>
  );
};
export default ProgressiveImage;
