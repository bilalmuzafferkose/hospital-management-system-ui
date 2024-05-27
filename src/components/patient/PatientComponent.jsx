import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
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

                const response = await fetch("http://localhost:8080/v1/patient/getAll", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch patients");
                }

                const data = await response.json();
                console.log(data);
                setPatients(data);
            } catch (error) {
                console.log("Error fetching patients", error.message);
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

            const response = await fetch(`http://localhost:8080/v1/patient/delete/${citizenshipNumber}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete patient");
            }

            // listeden silinmesi icin
            setPatients((prevPatients) => prevPatients.filter((patient) => patient.citizenshipNumber !== citizenshipNumber))
        } catch (error) {
            console.log("error deleting patient: ", error.message);
        }
    }

    const handleUpdate = (citizenshipNumber) => {
        navigate(`/patient/${citizenshipNumber}`);
    }

    return (
    <>
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Patient</h1>
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
                                {patients.map((patient) => (
                                    <tr key={patient.citizenshipNumber}>
                                        <td>{patient.citizenshipNumber}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.surname}</td>
                                        <td>{patient.birthDay}</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => handleUpdate(patient.citizenshipNumber)}>Update</Button> {" "}
                                            <Button variant="outline-danger" onClick={() => handleDelete(patient.citizenshipNumber)}>Delete</Button>
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

export default Dashboard;
