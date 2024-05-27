import {useState, useEffect} from 'react';
import "./AddBarcode.css";
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';


const AddBarcode = () => {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        patientCitizenshipNumber: "",
        expirationDate: "",
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
        if (formData.patientCitizenshipNumber && formData.expirationDate) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.patientCitizenshipNumber, formData.expirationDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch("http://localhost:8080/v1/barcode/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to save barcode");
            }

            const data = await response.json();
            console.log("Barcode created: ", data);
            navigate("/");
        } catch (error) {
            console.log("Error creating barcode: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Add Barcode</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="patientCitizenshipNumber"
                            placeholder="Enter Patient Citizenship Number"
                            value={formData.patientCitizenshipNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="date"
                            name="expirationDate"
                            placeholder="Enter Expiration Date"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={!isValid}>
                        Add Barcode
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default AddBarcode;