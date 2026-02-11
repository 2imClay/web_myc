import React, { useMemo } from 'react';
import { Container, Card, Button, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = React.useState(false);
    
    const cart = location.state?.cart;
    const products = location.state?.products;

    const cartItems = useMemo(() => {

        if (!Array.isArray(products) || products.length === 0) return [];

        return Object.keys(cart).map(productId => {
            const product = products.find(p => p.id === parseInt(productId));
            if (!product) return null;
            return {
                ...product,
                quantity: cart[productId]
            };
        }).filter(item => item.id);
    }, [cart, products]);

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleConfirmOrder = async () => {
        if(cartItems.length === 0) return;

        setLoading(true);

        const orderPayload = {
            tableId: 1,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                note: "",
            }))
        };

        try{

            const response = await axios.post('http://localhost:8080/orders', orderPayload);

            console.log("Kết quả từ Server:", response.data);
            console.log("Đơn hàng gửi đi:", cartItems);
            navigate('/success', {state: {orderId: response.data.id}});
        } catch (error){
            console.error("Lỗi khi gửi đơn hàng: ", error);
            alert("Có lỗi xãy ra !!!");
        } finally {
            setLoading(false);
        }

        
    };

    return (
        <Container className="py-3" style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-center mb-3">
                <Button variant="link" className="p-0 text-decoration-none me-2" onClick={() => navigate(-1)}>
                    ← Quay lại
                </Button>
                <h4 className="m-0">Xác nhận đơn món</h4>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center mt-5">
                    <p>Chưa có món nào được chọn</p>
                    <Button variant="primary" onClick={() => navigate('/')}>Về Menu</Button>
                </div>
            ) : (
                <>
                    {/* Danh sách món */}
                    <Card className="shadow-sm border-0 mb-3">
                        <ListGroup variant="flush">
                            {cartItems.map((item, index) => (
                                <ListGroup.Item key={index} className="py-3">
                                    <Row className="align-items-center">
                                        <Col xs={2}>
                                            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontWeight: 'bold'}}>
                                                x{item.quantity}
                                            </div>
                                        </Col>
                                        <Col xs={7}>
                                            <div className="fw-bold">{item.name}</div>
                                            <div className="text-muted small">{item.price.toLocaleString()} đ</div>
                                        </Col>
                                        <Col xs={3} className="text-end fw-bold">
                                            {(item.price * item.quantity).toLocaleString()}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>

                    {/* Tổng tiền & Nút chốt */}
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tổng cộng:</span>
                                <span className="h4 text-danger fw-bold">{totalPrice.toLocaleString()} đ</span>
                            </div>
                            <Button 
                                variant="success" 
                                size="lg" 
                                className="w-100 fw-bold"
                                onClick={handleConfirmOrder}
                                disabled={loading}
                            >
                                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'GỬI ĐƠN BẾP'}
                            </Button>
                        </Card.Body>
                    </Card>
                </>
            )}
        </Container>
    );
};

export default CartPage;