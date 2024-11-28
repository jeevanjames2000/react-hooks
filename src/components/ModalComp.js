import { useState } from "react";

export default function Modal(props) {
  const { data, title, handleModal, handleSubmit } = props;
  const [form, setForm] = useState(data);
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      id: data.id,
      [name]: value,
    });
  };

  const onSubmit = () => {
    handleSubmit(form);
    handleModal();
  };
  return (
    <>
      <div
        style={{
          border: "2px solid black",
          height: "20rem",
          width: "40rem",
          backgroundColor: "#ddd",
          zIndex: 1000,
          position: "absolute",
          top: 100,
          left: 200,
          right: 0,
        }}
      >
        <h2>{title}</h2>
        <div style={{ display: "flex", gap: 15 }}>
          <input
            type="text"
            name="col1"
            value={form.col1}
            onChange={handleForm}
          />
          <input
            type="text"
            name="col2"
            value={form.col2}
            onChange={handleForm}
          />
          <input
            type="text"
            name="col3"
            value={form.col3}
            onChange={handleForm}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 15,
            margin: 15,
            justifyContent: "center",
          }}
        >
          <button onClick={handleModal}>Close</button>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}
