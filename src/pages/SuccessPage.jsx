import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId || "???";

    return (
        <Container className="text-center py-5" style={{ maxWidth: '600px' }}>
            <div className="mb-4 text-success" style={{ fontSize: '4rem' }}>
                <i className="bi bi-check-circle-fill"></i>
            </div>
            <h2 className="mb-3">Đặt món thành công!</h2>
            <p className="text-muted mb-4">
                Đơn hàng <strong>#{orderId}</strong> đã được gửi xuống bếp.<br/>
                Vui lòng đợi trong giây lát.
            </p>
            
            <Button variant="outline-primary" onClick={() => navigate('/')}>
                Gọi thêm món
            </Button>
        </Container>
    );
};

export default SuccessPage;