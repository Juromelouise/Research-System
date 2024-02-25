import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/helpers";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    images.forEach((image) => {
      formData.append("images", image);
    });
    newProduct(formData);
  };

  const newProduct = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/new/product`,
        formData,
        config
      );
      alert("Product Created Succesfully");
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
      navigate(-1);
    }
  }, [error, success, navigate]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        paddingTop: "50px",
        borderRadius: "8px",
        backgroundColor: "#406EAB",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "black" }}>
        Create New Item
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", padding: "16px" }}
      >
        <label style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}>
          PRODUCT NAME:
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

        <label style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}>
          PRICE:
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

        <label style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}>
          IMAGE URL:
        </label>
        <input
          type="file"
          name="images"
          onChange={onChange}
          style={{
            padding: "12px",
            marginBottom: "24px",
            borderRadius: "4px",
            border: "5px solid #ddd",
          }}
          required
          multiple
        />
        {imagesPreview.map((img) => (
          <img
            src={img}
            key={img}
            alt="Images Preview"
            className="mt-3 mr-2"
            width="55"
            height="52"
          />
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: "#5D0664",
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
