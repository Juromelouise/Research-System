import React, { useState, useEffect, Fragment } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const ForumTable = () => {
  const navigate = useNavigate();
  const [forum, setForum] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const getAdminForums = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/forum/admin/all/post`,
        config
      );
      console.log(data.forum)
      setForum(data.forum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminForums();
  }, []);

  const nav = async (id) => {
    navigate(`/forum/open/${id}`);
  };

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
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Description",
          field: "post",
          sort: "asc",
        },
        {
          label: "Comment Length",
          field: "comment",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    forum.forEach((forum) => {
      data.rows.push({
        id: forum._id,
        title: forum.title,
        post: forum.post,
        comment: forum.comments.length,
        actions: (
          <Fragment>
            {/* <Link onClick={() => deleteProductHandler(forum._id)}>
              <Button variant="contained" color="error" className="delete-btn">
                Delete
              </Button>
            </Link> */}
              <Button variant="contained" color="info" onClick={() => nav(forum._id)}>
                Check Post
              </Button>
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
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ForumTable;
