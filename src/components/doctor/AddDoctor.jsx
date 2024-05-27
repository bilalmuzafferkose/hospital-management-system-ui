import {useState, useEffect} from 'react';
import "./AddDoctor.css";
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';


const AddDoctor = () => {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        citizenshipNumber: "",
        name: "",
        surname: "",
        email: "",
        birthday: ""
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
        if (formData.citizenshipNumber && formData.name && formData.surname && formData.email) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.citizenshipNumber, formData.name, formData.surname, formData.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch("http://localhost:8080/v1/doctor/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to save doctor");
            }

            const data = await response.json();
            console.log("doctor created: ", data);
            navigate("/doctors");
        } catch (error) {
            console.log("Error creating doctor: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Add Doctor</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="citizenshipNumber"
                            placeholder="Enter citizenship Number"
                            value={formData.citizenshipNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="surname"
                            placeholder="Enter surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="date"
                            name="birthDay"
                            placeholder="Enter birthday"
                            value={formData.birthDay}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={!isValid}>
                        Add Doctor
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default AddDoctor;