import React from "react";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

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
        `${process.env.REACT_APP_API}/api/v1//products`,
        config
      );
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminProducts();
  });

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
            <Link to={`/admin/product/${product._id}`}>
              <button className="edit-btn">Edit</button>
            </Link>
            {/* <Link onClick={() => deleteProductHandler(product._id)}>
              <button className="delete-btn">Delete</button>
            </Link> */}
          </Fragment>
        ),
      });
    });
  };

  return <div>ProductTable</div>;
};

export default ProductTable;
