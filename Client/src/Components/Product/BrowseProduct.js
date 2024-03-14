import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../utils/helpers';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import red from '@mui/material/colors/red';



const BrowseProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    }
                }
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products`, config);
                setProducts(data.products);
                setFilteredProducts(data.products);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }
        getAllProducts();
    }, []);

    const filterProductsByBaranggay = (baranggay) => {
        const filtered = products.filter(product => product.user && product.user.baranggay === baranggay);
        setFilteredProducts(filtered);
        handleClose(); // Close the menu after filtering
    };

    const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
            arr.slice(i * size, i * size + size)
        );
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
                    <h3>Sellers</h3>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', color: 'white' }}>
                   <div>
               <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                     BARANGAY
                   </IconButton>
                 <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={() => filterProductsByBaranggay('Western Bicutan')}>Western Bicutan</MenuItem>
            <MenuItem onClick={() => filterProductsByBaranggay('Upper Bicutan')}>Upper Bicutan</MenuItem>
            <MenuItem onClick={() => filterProductsByBaranggay('Signal')}>Signal</MenuItem>
        </Menu>
    </div>
</div>

                </div>
                {chunkArray(filteredProducts, 3).map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>
                        {row.map(product => (
                            <Card key={product._id} sx={{ maxWidth: 345, marginRight: '20px', bgcolor: '#01579b' }}>
                                <CardHeader
                                    avatar={<Avatar sx={{ bgcolor: red[500] }}>{product.user?.name ? product.user.name.charAt(0) : ''}</Avatar>}
                                    title={product.name}
                                    subheader={product.user?.name || 'Anonymous'}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={product.user?.avatar?.url || "/static/public/default-avatar.jpg"}
                                    alt={product.user?.name + " avatar" || "User Avatar"}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Button
                                        size="small"
                                        aria-expanded={expanded === product._id}
                                        onClick={() => setExpanded(expanded === product._id ? null : product._id)}
                                        style={{ color: 'white' }}
                                    >
                                        Learn More
                                    </Button>
                                    <IconButton
                                        aria-expanded={expanded === product._id}
                                        onClick={() => setExpanded(expanded === product._id ? null : product._id)}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded === product._id} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>{product.details}</Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseProduct;
