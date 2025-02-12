import React from "react";

export default function Youtube() {
  const videos = [
    { url: "https://youtu.be/wBtPGnVnA9g", name: "JS DSA" },
    { url: "https://youtu.be/zeCDuo74uzA", name: "TypeScript" },
  ];

  const getEmbedUrl = (url) => {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div>
      {videos.map((item, id) => (
        <div key={id}>
          <h3>{item.name}</h3>
          <iframe
            width="560"
            height="315"
            src={getEmbedUrl(item.url)}
            title={item.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
