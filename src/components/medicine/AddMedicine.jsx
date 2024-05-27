import {useState, useEffect} from 'react';
import "./AddMedicine.css";
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';


const AddMedicine = () => {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
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
        if (formData.name) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch("http://localhost:8080/v1/medicine/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to save medicine");
            }

            const data = await response.json();
            console.log("medicine created: ", data);
            navigate("/medicines");
        } catch (error) {
            console.log("Error creating medicine: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Add Medicine</h1>
                <Form onSubmit={handleSubmit}>

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
                    <Button variant="primary" type="submit" className="w-100" disabled={!isValid}>
                        Add Medicine
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default AddMedicine;