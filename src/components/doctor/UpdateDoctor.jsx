import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateDoctor = () => {
    const { citizenshipNumber } = useParams();
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    useEffect(() => {
        // form buton disabled kontrolu
        if (formData.name && formData.surname && formData.email) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.name, formData.surname, formData.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch(`http://localhost:8080/v1/doctor/update/${citizenshipNumber}`, {
                method: 'PUT',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to update doctor");
            }

            const data = await response.json();
            navigate(`/doctors`);
        } catch (error) {
            console.log(`Error updating doctor: `, error.message);
        }
    };

    return (
        <div className="center-form">
            <h1>Edit Patient</h1>
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

                <Form.Group controlId="formBasicSurname">
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

                <Form.Group controlId="formBasicBirthday">
                    <Form.Control
                        type="date"
                        name="birthDay"
                        placeholder="Enter birthDay"
                        value={formData.birthDay}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100"  disabled={!isValid}>
                    Edit Doctor
                </Button>
            </Form>
        </div>
    );
};

export default UpdateDoctor;
