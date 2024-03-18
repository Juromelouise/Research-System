import React, { useState, useEffect, Fragment } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { Button } from "@mui/material";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const getAdminProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products`,
        config
      );
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminProducts();
  }, []);

  const deleteProductHandler = async (productId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/delete/product/${productId}`,
      config
    );
    getAdminProducts();
    console.log(`Deleting product with ID: ${productId}`);
  };

  const productsList = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Product Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Product Image",
          field: "images",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      console.log(product);
      data.rows.push({
        id: product._id,
        name: product.name,
        images: (
          <img
            src={product.images[0].url}
            alt={product.images[0].public_id}
            style={{ width: "50px", height: "50px" }}
          />
        ),
        price: `$${product.price}`,
        actions: (
          <Fragment>
            {/* <Link to={`/product/update/${product._id}`}>
              <Button variant="contained" color="primary" className="edit-btn">
                Edit
              </Button>
            </Link> */}
            <Link onClick={() => deleteProductHandler(product._id)}>
              <Button
                variant="contained"
                color="secondary"
                className="delete-btn"
              >
                Delete
              </Button>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <div className="col-12 col-md-10">
          <Fragment>
            <p className="star" style={{ color: "#fff" }}>
              <h1> PRODUCTS</h1>
            </p>
            <div className="custom-mdb-table">
              <MDBDataTable
                data={productsList()}
                className="custom-mdb-table"
                bordered
                striped
                hover
              />
            </div>
            <Button
              component={Link}
              to="/admin/create/product"
              className={`AddProduct-btn ${isHovered ? "hovered" : ""}`}
              sx={{
                mt: 3,
                backgroundColor: "purple",
                color: "white",
                transition: "color 0.3s, background-color 0.3s",
                margin: "20px 30px",
                padding: "15px",
                "&:hover": {
                  color: "white", // Text color on hover
                  backgroundColor: "grey", // Background color on hover
                },
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Add Product
            </Button>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductTable;
