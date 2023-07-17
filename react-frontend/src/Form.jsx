import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/api/endpoint/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
