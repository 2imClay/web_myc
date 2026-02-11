import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Lỗi gọi API:", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));
    };



    // Tính tổng số lượng để hiện lên nút Giỏ hàng
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

    return (
        <Container className="py-3" style={{ maxWidth: '600px' }}>
            {/* Header quán */}
            <div className="text-center mb-4">
                <h4>☕ Coffee Menu</h4>
                <p className="text-muted">Bàn số: 10</p> 
                {/* Sau này số bàn sẽ lấy từ URL QR Code */}
            </div>

            {/* Danh sách món */}
            <Row>
                {products.map(product => (
                    <Col xs={6} key={product.id} className="mb-3">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Img variant="top" src={product.img} style={{ height: '120px', objectFit: 'cover' }} />
                            <Card.Body className="p-2 d-flex flex-column">
                                <Card.Title style={{ fontSize: '1rem' }}>{product.name}</Card.Title>
                                <Card.Text className="text-danger fw-bold">
                                    {product.price.toLocaleString()} đ
                                </Card.Text>
                                <div className="mt-auto">
                                    {cart[product.id] ? (
                                        <Button variant="success" size="sm" className="w-100 disabled">
                                            Đã chọn: {cart[product.id]}
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="w-100"
                                            onClick={() => addToCart(product)}
                                        >
                                            + Thêm
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Nút Giỏ hàng nổi bên dưới (Sticky Bottom) */}
            {totalItems > 0 && (
                <div className="fixed-bottom p-3 bg-white border-top shadow">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-100 d-flex justify-content-between align-items-center"
                        onClick={() => navigate('/cart', { state: { cart: cart, products: products } })}
                    >
                        <span>🛒 Xem giỏ hàng</span>
                        <Badge bg="light" text="dark" pill>{totalItems} món</Badge>
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default MenuPage;