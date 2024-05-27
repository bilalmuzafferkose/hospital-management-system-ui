import {useState, useEffect} from 'react';
import "./UpdateBarcode.css";
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from 'react-router-dom';


const UpdateBarcode = () => {
    const { id } = useParams();
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        medicineName: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    useEffect(() => {
        // form buton disabled kontrolu
        if (formData.medicineName) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.medicineName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch(`http://localhost:8080/v1/barcode/addMedicine/${id}`, {
                method: 'PUT',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to update barcode");
            }

            const data = await response.json();
            console.log("Barcode updated: ", data);
            navigate("/");
        } catch (error) {
            console.log("Error updating barcode: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Update Barcode</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="medicineName"
                            placeholder="Enter Medicine Name"
                            value={formData.medicineName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={!isValid}>
                        Update Barcode
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateBarcode;