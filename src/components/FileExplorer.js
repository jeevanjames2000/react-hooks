import { useEffect, useState } from "react";

export default function FileExplorer() {
  const data = [
    {
      id: 1,
      name: "README.md",
    },
    {
      id: 2,
      name: "Documents",
      children: [
        {
          id: 3,
          name: "Word.doc",
        },
        {
          id: 4,
          name: "Powerpoint.ppt",
        },
      ],
    },
    {
      id: 5,
      name: "Downloads",
      children: [
        {
          id: 6,
          name: "unnamed.txt",
        },
        {
          id: 7,
          name: "Misc",
          children: [
            {
              id: 8,
              name: "foo.txt",
            },
            {
              id: 9,
              name: "bar.txt",
            },
          ],
        },
      ],
    },
  ];

  const [d, setD] = useState([]);
  const [openState, setOpenState] = useState({});

  useEffect(() => {
    setD(data);
  }, []);

  const handleOpen = (id) => {
    setOpenState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderFileOrFolder = (item) => {
    const isOpen = openState[item.id];

    if (item.children) {
      return (
        <div key={item.id}>
          <strong
            onClick={() => handleOpen(item.id)}
            style={{ cursor: "pointer" }}
          >
            {item.name}
            {"^"}
          </strong>
          {isOpen && (
            <ul>{item.children.map((child) => renderFileOrFolder(child))}</ul>
          )}
        </div>
      );
    } else {
      return <div key={item.id}>{item.name}</div>;
    }
  };

  return <div>{d.map((item) => renderFileOrFolder(item))}</div>;
}
