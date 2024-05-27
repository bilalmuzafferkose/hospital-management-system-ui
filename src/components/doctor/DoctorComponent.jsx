import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const DoctorComponent = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Unauthorized");
                }
                else {
                console.log(`token: `, token);
                }

                const response = await fetch("http://localhost:8080/v1/doctor/getAll", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }

                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.log("Error fetching doctors", error.message);
            }
        };
        fetchPatients();
    }, []);

    const handleDelete = async (citizenshipNumber) => {
        console.log(citizenshipNumber);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch(`http://localhost:8080/v1/doctor/delete/${citizenshipNumber}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete doctor");
            }

            // listeden silinmesi icin
            setPatients((prevDoctors) => prevDoctors.filter((doctor) => doctor.citizenshipNumber !== citizenshipNumber))
        } catch (error) {
            console.log("error deleting doctor: ", error.message);
        }
    }

    const handleUpdate = (citizenshipNumber) => {
        navigate(`/doctor/${citizenshipNumber}`);
    }

    return (
    <>
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Doctor</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Citizenship Number</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Birthday</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.citizenshipNumber}>
                                        <td>{doctor.citizenshipNumber}</td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.surname}</td>
                                        <td>{doctor.birthday}</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => handleUpdate(doctor.citizenshipNumber)}>Update</Button> {" "}
                                            <Button variant="outline-danger" onClick={() => handleDelete(doctor.citizenshipNumber)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    )
}

export default DoctorComponent;
