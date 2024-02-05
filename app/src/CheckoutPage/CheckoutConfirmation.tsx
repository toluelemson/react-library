import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
    const location = useLocation();
    const { orderDetails } = location.state as any;

    return (
        <div className="container mt-5">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
            <p>Order ID: {orderDetails.orderId}</p>
            <p>Total Amount: ${orderDetails.totalAmount}</p>
            <p>{orderDetails.confirmationMessage}</p>
        </div>
    );
};

export default ConfirmationPage;
