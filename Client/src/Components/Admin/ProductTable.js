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

  const deleteProductHandler = (productId) => {
    // Implement your delete logic here
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
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        actions: (
          <Fragment>
            <Link to={`/product/update/${product._id}`}>
              <button className="edit-btn">Edit</button>
            </Link>
            <button
              className="delete-btn"
              onClick={() => deleteProductHandler(product._id)}
            >
              Delete
            </button>
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
            <p className="star">ALL PRODUCTS</p>
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
              to="/admin/product/new"
              className="AddProduct-btn"
              sx={{
                mt: 3,
                color: "white",
                backgroundColor: isHovered ? "gray" : "black",
                transition: "color 0.3s, background-color 0.3s",
                margin: "20px 30px",
                padding: "15px",
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
