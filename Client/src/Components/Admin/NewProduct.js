import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/helpers";
import { Loader } from "../Layout/Loader";
import { toast } from "react-toastify";

const NewProduct = () => {
  const user = getUser();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [attachmentsPreview, setAttachmentsPreview] = useState([]);
  const [success, setSuccess] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    Array(...images).forEach((image) => {
      formData.append("images", image);
    });
    Array(...attachments).forEach((attachments) => {
      formData.append("attachment", attachments);
    });

    setLoading(true);
    newProduct(formData);
  };

  const newProduct = async (formData) => {
    let url;
    if (user.role === "seller" || user.role === "supplier") {
      url = `${process.env.REACT_APP_API}/api/v1/new/product`;
    } else {
      url = `${process.env.REACT_APP_API}/api/v1/new/user/product`;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      console.log(url);

      const { data } = await axios.post(url, formData, config);

      toast(`✔ Product Created Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setSuccess(data.success);
      setLoading(false);
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
      setImages(e.target.files);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const onChangeAttachments = (e) => {
    const files = Array.from(e.target.files);
    setAttachmentsPreview([]);
    setAttachments([]);
    files.forEach((file) => {
      const reader = new FileReader();
      setAttachments(e.target.files);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAttachmentsPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {loading ? <Loader open={loading} /> : <></>}{" "}
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
          Create New Item
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          }}
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
            PRICE PER KILO:
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

          <label
            style={{ marginBottom: "8px", fontSize: "15px", color: "black" }}
          >
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
              width="120"
              height="120"
            />
          ))}

          {user.role === "buyer" ? (
            <>
              <label
                style={{
                  marginBottom: "8px",
                  fontSize: "15px",
                  color: "black",
                }}
              >
                BUSINESS PERMIT/ID:
              </label>
              <input
                type="file"
                name="attachments"
                onChange={onChangeAttachments}
                style={{
                  padding: "12px",
                  marginBottom: "24px",
                  borderRadius: "4px",
                  border: "5px solid #ddd",
                }}
                required
                multiple
              />
              {attachmentsPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="120"
                  height="120"
                />
              ))}
            </>
          ) : (
            <></>
          )}

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
    </>
  );
};

export default NewProduct;
