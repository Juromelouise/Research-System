import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/helpers";

const UpdateProduct = () => {
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  let navigate = useNavigate();

  let { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    images.forEach((image) => {
      formData.append("images", image);
    });
    updateProduct(product._id, formData);
  };

  const getProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/${id}`
      );
      setProduct(data.product);
     setOldImages(data.product.images);
      setSuccess(data.success);
      setName(data.product.name);
      setPrice(data.product.price);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/update/product/${id}`,
        productData,
        config
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);
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

        <div className="form-group">
          <label>Images</label>
          <div className="custom-file">
            <input
              type="file"
              name="images"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
              multiple
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose Images
            </label>
          </div>
          {oldImages &&
            oldImages.map((img) => (
              <img
                key={img}
                src={img.url}
                alt={img.url}
                className="mt-3 mr-2"
                width="55"
                height="52"
              />
            ))}
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
        </div>

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

export default UpdateProduct;
