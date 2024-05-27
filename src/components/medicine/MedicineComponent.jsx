import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Unauthorized");
                }
                else {
                console.log(`token: `, token);
                }

                const response = await fetch("http://localhost:8080/v1/medicine/getAll", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch medicines");
                }

                const data = await response.json();
                setMedicines(data);
            } catch (error) {
                console.log("Error fetching medicines", error.message);
            }
        };
        fetchMedicines();
    }, []);

    const handleDelete = async (name) => {
        console.log(name);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch(`http://localhost:8080/v1/medicine/delete/${name}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete medicine");
            }

            // listeden silinmesi icin
            setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.name !== name))
        } catch (error) {
            console.log("error deleting medicine: ", error.message);
        }
    }

    return (
    <>
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Medicine</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.map((medicine) => (
                                    <tr key={medicine.name}>
                                        <td>{medicine.name}</td>
                                        <td>
                                            <Button variant="outline-danger" onClick={() => handleDelete(medicine.name)}>Delete</Button>
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
