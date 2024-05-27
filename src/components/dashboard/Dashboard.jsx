import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [barcodes, setBarcodes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBarcodes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Unauthorized");
                } else {
                    console.log(`token: `, token);
                }

                const response = await fetch("http://localhost:8080/v1/barcode/getAll", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch barcodes");
                }

                const data = await response.json();
                setBarcodes(data);
            } catch (error) {
                console.log("Error fetching barcodes", error.message);
            }
        };
        fetchBarcodes();
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch(`http://localhost:8080/v1/barcode/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete barcode");
            }

            // listeden silinmesi icin
            setBarcodes((prevBarcode) => prevBarcode.filter((barcode) => barcode.id !== id))
        } catch (error) {
            console.log("error deleting barcode: ", error.message);
        }
    }


    const handleUpdate = (id) => {
        navigate(`/barcode/${id}`);
    }

    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Barcodes</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Medicine List</th>
                                    <th>Patient Citizenship Number</th>
                                    <th>Expiration Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barcodes.map((barcode) => (
                                    <tr key={barcode.id}>
                                        <td>{barcode.id}</td>
                                        <td>
                                            {barcode.medicineDtoList.map((medicine, index) => (
                                                <div key={index}>
                                                    {medicine.name}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{barcode.patientDto.citizenshipNumber}</td>
                                        <td>{barcode.expirationDate}</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => handleUpdate(barcode.id)}>Add Medicine</Button>{" "}
                                            <Button variant="outline-danger" onClick={() => handleDelete(barcode.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard;
