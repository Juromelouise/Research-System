import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/helpers";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    newProduct(formData);
  };

  const newProduct = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        }
        // withCredentials: true, correct
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/new/product`,
        formData,
        config
      );
      setSuccess(data.success);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (success) {
      navigate("/homepage");
    }
  }, [error, success, navigate]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        paddingTop: "50px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#333" }}>
        Create New Item
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", padding: "16px" }}
      >
        <label style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
          required
        />

        <label style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          rows="4"
          style={{
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
          required
        ></input>

        {/* <label style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          style={{ padding: "12px", marginBottom: "24px", borderRadius: "4px", border: "1px solid #ddd" }}
          required
        /> */}

        <button
          type="submit"
          style={{
            backgroundColor: "#61dafb",
            color: "#fff",
            padding: "12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
