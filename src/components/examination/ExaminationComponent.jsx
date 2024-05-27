import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const ExaminationComponent = () => {
    const [examinations, setExaminations] = useState([]);

    useEffect(() => {
        const fetchExaminations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Unauthorized");
                }
                else {
                console.log(`token: `, token);
                }

                const response = await fetch("http://localhost:8080/v1/examination/getAll", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch examinations");
                }

                const data = await response.json();
                console.log(data);
                setExaminations(data);
            } catch (error) {
                console.log("Error fetching examinations", error.message);
            }
        };
        fetchExaminations();
    }, []);

    return (
    <>
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Examination</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Barcode Id</th>
                                    <th>Patient Citizenship Number</th>
                                    <th>Doctor Citizenship Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examinations.map((examination) => (
                                    <tr key={examination.id}>
                                        <td>{examination.barcodeDto.id}</td>
                                        <td>{examination.patientDto.citizenshipNumber}</td>
                                        <td>{examination.doctorDto.citizenshipNumber}</td>
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

export default ExaminationComponent;
