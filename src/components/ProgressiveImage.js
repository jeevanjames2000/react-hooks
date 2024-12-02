import React, { useState, useEffect } from "react";

const ProgressiveImage = ({ alt }) => {
  const [showHighRes, setShowHighRes] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      const slowConnections = ["2g", "slow-2g", "3g", "4g"];
      setIsSlowConnection(slowConnections.includes(connection.effectiveType));
    }

    const lowQualityImage =
      "http://localhost:2021/api/gym/optimizeImage/120/120/10";
    const highQualityImage =
      "http://localhost:2021/api/gym/optimizeImage/300/300/100";

    setImageSrc(isSlowConnection ? lowQualityImage : highQualityImage);
    console.log("isSlowConnection: ", isSlowConnection);
  }, [isSlowConnection]);

  const handleImageClick = () => {
    if (!showHighRes) {
      const highQualityImage =
        "http://localhost:2021/api/gym/optimizeImage/300/300/100";
      setImageSrc(highQualityImage);
      setShowHighRes(true);
    }
  };

  return (
    <div>
      <img src={imageSrc} alt={alt} onClick={handleImageClick} />
      {!showHighRes && <p>Click the image for a high-resolution image.</p>}
    </div>
  );
};

export default ProgressiveImage;
