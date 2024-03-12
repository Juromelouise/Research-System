import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import { Loader } from "../Layout/Loader";

const UpdateProduct = () => {
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    Array(...images).forEach((image) => {
      formData.append("images", image);
    });
    setLoading(true);
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
      setDescription(data.product.description);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/update/product/${id}`,
        productData,
        config
      );
      setLoading(false);
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
      setImages(e.target.files);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {loading ? <Loader open={loading} /> : <></>}
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
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "black",
          }}
        >
          Update Item
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          }}
          encType="multipart/form-data"
        >
          <label
            style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}
          >
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

          <label
            style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}
          >
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
          <label
            style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}
          >
            DESCRIPTION:
          </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <label>Images Url</label>
            <div className="custom-file">
              <input
                type="file"
                name="images"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}
                style={{
                  padding: "12px",
                  marginBottom: "24px",
                  borderRadius: "4px",
                  border: "5px solid #ddd",
                }}
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
              backgroundColor: "#5D0664",
              color: "#fff",
              padding: "12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
