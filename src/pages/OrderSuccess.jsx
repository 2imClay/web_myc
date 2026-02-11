import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="mb-4 text-success" style={{ fontSize: '5rem' }}>
                ✓
            </div>
            <h3 className="mb-3">Gửi đơn thành công!</h3>
            <p className="text-muted mb-5">
                Nhà bếp đã nhận được yêu cầu của bạn.<br/>
                Món ăn sẽ được phục vụ trong ít phút nữa.
            </p>
            
            <Button variant="outline-primary" onClick={() => navigate('/')}>
                Quay về Menu
            </Button>
        </Container>
    );
};

export default OrderSuccess;