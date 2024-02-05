import React, {useState} from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const countries = ["Estonia", "Finland"];

type CheckoutForm = {
    name: string;
    contact: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    creditCardNumber: string;
    creditCardExpirationDate: string;
    creditCardCVV: string;
    userComment: string;
    discountCode: string;
    shippingMethod: string;
    giftMessage: string;
    billingStreet: string;
    billingCity: string;
    billingState: string;
    billingZip: string;
    billingCountry: string;
    paymentMethod: string;
    giftWrapping: boolean;
    termsAndConditionsAccepted: boolean;
    shippingInstructions: string;
    notificationPreferences: string[];
};

const CheckoutPage: React.FC = () => {
    const {bookId} = useParams<{ bookId: string }>();
    const navigate = useNavigate();


    const [formData, setFormData] = useState<CheckoutForm>({
        name: '',
        contact: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Select a country',
        creditCardNumber: '',
        creditCardExpirationDate: '',
        creditCardCVV: '',
        userComment: '',
        discountCode: '',
        shippingMethod: '',
        giftMessage: '',
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        billingCountry: 'Select a country',
        paymentMethod: '',
        giftWrapping: false,
        termsAndConditionsAccepted: false,
        shippingInstructions: '',
        notificationPreferences: [],
    });
    const location = useLocation();
    const book = location.state;

    console.log(book)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type, checked} = event.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCheckout = async (event: React.FormEvent) => {
        event.preventDefault();


        try {

            const response = await axios.post('http://localhost:8081/checkout', {
                ...formData,
                totalAmount: book.totalAmount
            });
            navigate('confirmation', {state: {orderDetails: response.data}});
            console.log(response.data);
            alert(`Order placed successfully! Order ID: ${response.data.orderId}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error);
                alert(`An error occurred: ${error}`);
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred');
            }
        }
    };


    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Checkout</h1>
            <form onSubmit={handleCheckout} className="card p-4 shadow">
                <h2 className="mb-3">Book Details</h2>
                <p>Proceeding with the checkout for book ID: {bookId}</p>

                {/* User Information */}
                <div className="row">
                    <div className="col-md-6">
                        <h3>User Information</h3>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name}
                                   onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">Contact</label>
                            <input type="tel" className="form-control" id="contact" name="contact"
                                   value={formData.contact} onChange={handleInputChange} required/>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <h3>Billing Address</h3>
                        {/* Address */}
                        {/* Street */}
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street</label>
                            <input type="text" className="form-control" id="street" name="street"
                                   value={formData.street} onChange={handleInputChange} required/>
                        </div>
                        {/* City */}
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={formData.city}
                                   onChange={handleInputChange} required/>
                        </div>
                        {/* State */}
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" className="form-control" id="state" name="state" value={formData.state}
                                   onChange={handleInputChange} required/>
                        </div>
                        {/* Zip */}
                        <div className="mb-3">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="zip" name="zip" value={formData.zip}
                                   onChange={handleInputChange} required/>
                        </div>
                        {/* Country */}
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select className="form-control" id="country" name="country" value={formData.country}
                                    onChange={handleInputChange} required>
                                <option value="">Select a country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h3>Payment Details</h3>
                        <div className="mb-3">
                            <label htmlFor="creditCardNumber" className="form-label">Credit Card Number</label>
                            <input type="text" className="form-control" id="creditCardNumbe" name="creditCardNumber"
                                   value={formData.creditCardNumber} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="creditCardExpirationDate" className="form-label">Expiration Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="creditCardExpirationDate"
                                name="creditCardExpirationDate"
                                value={formData.creditCardExpirationDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                                pattern="\d{2}/\d{2}" // Simple pattern for MM/YY format
                                title="Enter date in MM/YY format"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="creditCardCVV" className="form-label">CVV</label>
                            <input
                                type="text"
                                className="form-control"
                                id="creditCardCVV"
                                name="creditCardCVV"
                                value={formData.creditCardCVV}
                                onChange={handleInputChange}
                                required
                                maxLength={4}
                                pattern="\d{3,4}"
                                title="CVV should be a 3 or 4 digit number"
                            />
                        </div>

                    </div>
                    <div className="col-md-6">
                        <h3>Additional Information</h3>
                        <div className="mb-3">
                            <label htmlFor="userComment" className="form-label">User Comment</label>
                            <textarea className="form-control" id="userComment" name="userComment"
                                      value={formData.userComment} onChange={handleInputChange}/>
                        </div>
                        {/* Discount Code */}
                        <div className="mb-3">
                            <label htmlFor="discountCode" className="form-label">Discount Code</label>
                            <input type="text" className="form-control" id="discountCode" name="discountCode"
                                   value={formData.discountCode} onChange={handleInputChange}/>
                        </div>
                        {/* Shipping Method */}
                        <div className="mb-3">
                            <label htmlFor="shippingMethod" className="form-label">Shipping Method</label>
                            <input type="text" className="form-control" id="shippingMethod" name="shippingMethod"
                                   value={formData.shippingMethod} onChange={handleInputChange}/>
                        </div>
                    </div>
                </div>

                <div className="form-group mt-4">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="termsAndConditions"
                               name="termsAndConditionsAccepted" checked={formData.termsAndConditionsAccepted}
                               onChange={handleInputChange} required/>
                        <label className="form-check-label" htmlFor="termsAndConditions">I accept the terms and
                            conditions</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-success btn-lg mt-3">Submit</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
