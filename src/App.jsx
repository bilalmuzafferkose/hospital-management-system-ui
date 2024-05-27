import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import AddBarcode from './components/barcode/AddBarcode';
import UpdateBarcode from './components/barcode/UpdateBarcode';
import PrivateRoute from './components/PrivateRoute';
import PatientComponent from './components/patient/PatientComponent';
import AddPatient from './components/patient/AddPatient';
import UpdatePatient from './components/patient/UpdatePatient';
import NoMatch from './components/NoMatch';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Unauthorized from './components/Unauthorize';
import MedicineComponent from './components/medicine/MedicineComponent';
import AddMedicine from './components/medicine/AddMedicine';
import ExaminationComponent from './components/examination/ExaminationComponent';
import AddExamination from './components/examination/AddExamination';
import DoctorComponent from './components/doctor/DoctorComponent';
import AddDoctor from './components/doctor/AddDoctor';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-barcode" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddBarcode />
          </PrivateRoute>
        } />
        <Route path="/barcode/:id" element={
          <PrivateRoute roles={['ADMIN']}>
            <UpdateBarcode />
          </PrivateRoute>
        } />

        <Route path="/patients" element={
          <PrivateRoute roles={['ADMIN']}>
            <PatientComponent />
          </PrivateRoute>
        } />
        <Route path="/add-patient" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddPatient />
          </PrivateRoute>
        } />
        <Route path="/patient/:citizenshipNumber" element={
          <PrivateRoute roles={['ADMIN']}>
            <UpdatePatient />
          </PrivateRoute>
        } />
        <Route path="/medicines" element={
          <PrivateRoute roles={['ADMIN']}>
            <MedicineComponent />
          </PrivateRoute>
        } />
        <Route path="/add-medicine" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddMedicine />
          </PrivateRoute>
        } />
        <Route path="/examinations" element={
          <PrivateRoute roles={['ADMIN']}>
            <ExaminationComponent />
          </PrivateRoute>
        } />
        <Route path="/add-examination" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddExamination />
          </PrivateRoute>
        } />
        <Route path="/doctors" element={
          <PrivateRoute roles={['ADMIN']}>
            <DoctorComponent />
          </PrivateRoute>
        } />
        <Route path="/add-doctor" element={
          <PrivateRoute roles={['ADMIN']}>
            <AddDoctor />
          </PrivateRoute>
        } />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NoMatch />} />

        </Routes>
    </>
  )
}

export default App
