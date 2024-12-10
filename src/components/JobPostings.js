import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    type: "job",
    desc: "Infosys is Hiring for Frontend developer role",
    skills: ["React", "Next.js", "Bootstrap", "MUI"],
    date: "2024-12-033",
    url: "www.infosys.in",
  },
  {
    id: 2,
    type: "job",
    desc: "Tcs is Hiring for Backend developer role",
    url: "www.tcs.in",
    skills: ["Node.js", "Sql", "Nginix", "Aws"],
    date: "2024-12-033",
  },
  {
    id: 3,
    type: "job",
    url: "www.gitam.edu",
    desc: "Gitam is Hiring for FullStack developer role",
    skills: ["React", "Next.js", "Node.js", "Aws", "Docker", "Kafka"],
    date: "2024-12-033",
  },
  {
    id: 4,
    type: "job",
    url: "www.Google.com",
    desc: "Gitam is Hiring for Dotnet developer role",
    skills: ["Dotnet", "Html", "css", "Javascript", "MVC", "Dotnet Core"],
    date: "2024-12-033",
  },
  {
    id: 5,
    type: "job",
    desc: "Gitam is Hiring for UI designer",
    skills: ["Figma", "Adobe", "UI design", "Html"],
    date: "2024-12-033",
  },
  {
    id: 6,
    type: "job",
    desc: "Gitam is Hiring for IT executive",
    skills: ["Networking", "IT support", "Ticketing"],
    date: "2024-12-033",
  },
];

export default function JobPostings() {
  const [f, setF] = useState(null);
  const dataLength = data.length;
  const filterData = (data) => {
    setF(data.slice(0, 3));
  };

  const [load, setLoad] = useState(false);

  const loadmore = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      setF((prev) => [...prev, ...data.slice(prev.length, prev.length + 3)]);
    }, 1000);
  };
  useEffect(() => {
    filterData(data);
  }, []);

  return (
    <>
      <div>
        <div style={containerStyle}>
          {f?.map((item, i) => (
            <div key={i} style={itemStyle}>
              <strong>{item.desc}</strong>
              {item.url && <a href={item.url}>{item.url}</a>}
            </div>
          ))}
          {load && <div>Loading....</div>}
          {f?.length < dataLength && (
            <button onClick={loadmore}>Load more</button>
          )}
        </div>
      </div>
    </>
  );
}

const containerStyle = {
  width: "100%",
  height: "100vh",
  margin: "auto",
  display: "block",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
};
const itemStyle = {
  height: "3rem",
  backgroundColor: "#ddd",
  marginBottom: "10px",
  textAlign: "left",
  display: "flex",
  paddingLeft: "1rem",
  justifyContent: "left",
  alignItems: "center",
  flexDirection: "column",
};
