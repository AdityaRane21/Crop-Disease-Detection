# Crop Disease Detection Using Drone and Machine Learning

A project that uses **drone imagery** and **machine learning** to detect crop diseases in real-time. This system helps farmers monitor crop health efficiently and take timely action.

## 🚀 Project Overview

- **Objective:** Detect crop diseases using images captured by drones and classify them using machine learning models.  
- **Tech Stack:** React (Frontend), Node.js/Express (Backend), Machine Learning service for prediction.  
- **Features:**  
  - Upload drone images for analysis  
  - ML-based disease detection  
  - Frontend dashboard for visualization  
  - Backend API for image processing and ML inference  

---

## 📂 Repository Structure

├─ backend/ # Server-side code
├─ frontend/ # React frontend
├─ ml-service/ # Machine Learning service for prediction
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ changes.js # JS utilities / helpers
├─ changes.jsx # React components / frontend logic



---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/crop-disease-detection.git
cd crop-disease-detection

2. Install dependencies
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install

# For ML service
cd ../ml-service
npm install

3. Run the application
# Start backend server
cd backend
npm start

# Start frontend
cd ../frontend
npm run dev

# Start ML service
cd ../ml-service
node index.js

📈 How It Works

Image Capture: Drones capture images of crop fields.

Image Upload: Images are sent to the backend API.

ML Inference: The ML service processes the images and predicts diseases.

Dashboard Visualization: Results are displayed in the frontend for farmers.

📝 Usage

Update the ML model in ml-service to improve disease detection accuracy.

Customize frontend components in frontend/src as needed.

Backend APIs can be extended to support multiple image formats and bulk uploads.

💡 Future Improvements

Real-time drone streaming and detection

Mobile app integration for farmers

Automated alerts and recommendations based on detected diseases

Cloud deployment for large-scale usage
