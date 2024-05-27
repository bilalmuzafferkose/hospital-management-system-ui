import {useState, useEffect} from 'react';
import "./AddExamination.css";
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';


const AddExamination = () => {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        barcodeId: "",
        patientCitizenshipNumber: "",
        doctorCitizenshipNumber: "",
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
        if (formData.barcodeId && formData.patientCitizenshipNumber && formData.doctorCitizenshipNumber) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.barcodeId, formData.patientCitizenshipNumber, formData.doctorCitizenshipNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch("http://localhost:8080/v1/examination/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to save examination");
            }

            const data = await response.json();
            console.log("examination created: ", data);
            navigate("/examinations");
        } catch (error) {
            console.log("Error creating examination: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Add Examination</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="barcodeId"
                            placeholder="Enter Barcode Id"
                            value={formData.barcodeId}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="patientCitizenshipNumber"
                            placeholder="Enter Patient citizenship number"
                            value={formData.patientCitizenshipNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="doctorCitizenshipNumber"
                            placeholder="Enter Doctor citizenship number"
                            value={formData.doctorCitizenshipNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={!isValid}>
                        Add Examination
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default AddExamination;