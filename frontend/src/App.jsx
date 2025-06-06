import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import DiseaseAnalysis from "./pages/DiseaseAnalysis";
import Forum from "./pages/Forum";
import ImageUpload from "./pages/ImageUpload";
import Dashboard from "./pages/Dashboard";
import MLServiceDashboard from "../../ml-service/MlServiceDashboard";
import Reports from "./pages/Reports";
import Treatments from "./pages/Treatments";
import { Toaster } from 'react-hot-toast';
import DiseaseDetectionPage from './pages/DiseaseMap'// 👈 Add this at the top with other imports



function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route 
              path="/dashboard" 
              element={
                  <Dashboard />
                
              } 
            />
            
            
            
            {/* <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            /> */}
            
            <Route 
              path="/reports" 
              element={
                
                  <Reports />
                
              } 
            />
            <Route 
              path="/forum" 
              element={
                
                  <Forum />
                
              } 
            />
            <Route 
              path="/treatments" 
              element={
                
                  <Treatments />
                
              } 
            />
            
            <Route 
              path="/disease-analysis" 
              element={
                
                  <DiseaseAnalysis />
                
              } 
            />
            
            {/* <Route 
              path="/forum" 
              element={
                <PrivateRoute>
                  <Forum />
                </PrivateRoute>
              } 
            /> */}
            
<Route path="/detect-disease" element={<DiseaseDetectionPage />} />



            <Route 
              path="/image-upload" 
              element={
                
                  <ImageUpload />
                
              } 
            />
            <Route 
              path="/MLServiceDashboard" 
              element={
                <MLServiceDashboard/>
              } 
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;