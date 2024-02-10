import React, { useState } from "react";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      price: "",
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#333" }}>Create New Item</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <label style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>Title:</label>
        <input
          type="text"
          name="title"
          value={name}
          onChange={handleChange}
          style={{ padding: "12px", marginBottom: "16px", borderRadius: "4px", border: "1px solid #ddd" }}
          required
        />

        <label style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>Price:</label>
        <textarea
          name="price"
          value={price}
          onChange={handleChange}
          rows="4"
          style={{ padding: "12px", marginBottom: "16px", borderRadius: "4px", border: "1px solid #ddd" }}
          required
        ></textarea>

        {/* <label style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          style={{ padding: "12px", marginBottom: "24px", borderRadius: "4px", border: "1px solid #ddd" }}
          required
        /> */}

        <button type="submit" style={{ backgroundColor: "#61dafb", color: "#fff", padding: "12px", borderRadius: "4px", cursor: "pointer" }}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
