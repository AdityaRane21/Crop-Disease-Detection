# Crop Disease Detection Using Drone and Machine Learning

A system that leverages **drone imagery** and **machine learning** to detect crop diseases efficiently. The solution aims to help farmers monitor crop health early and take timely preventive actions.

---

## 🚀 Project Overview

- **Objective:**  
  Detect and classify crop diseases using images captured by drones and processed through machine learning models.

- **Tech Stack:**  
  - **Frontend:** React  
  - **Backend:** Node.js, Express  
  - **ML Service:** Machine Learning–based prediction service  

- **Key Features:**  
  - Upload drone-captured images  
  - ML-based disease detection  
  - Interactive frontend dashboard  
  - Backend APIs for image handling and inference  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/crop-disease-detection.git
cd crop-disease-detection
all
```
### 2️⃣ Install Frontend Dependencies
```
cd frontend
npm install
```
### 3️⃣ Install Backend Dependencies
```
cd ../backend
npm install
```
### 4️⃣ Install ML Service Dependencies
```
cd ../ml-service
npm install
```
### 5️⃣ Start the Backend Server
```
cd backend
npm start
```
### 6️⃣ Start the Frontend Application
```
cd ../frontend
npm run dev
```
### 7️⃣ Start the ML Service
```
cd ../ml-service
node index.js
```
### 📈 How It Works
```
Drones capture images of crop fields.
Captured images are uploaded to the backend via APIs.
The ML service processes images and predicts crop diseases.
Results are displayed on the frontend dashboard for farmers.
```
### 📝 Usage
```
Update or retrain models inside the ml-service folder to improve accuracy.
Modify UI components inside frontend/src.
Enhance APIs to support bulk uploads or additional image formats.
```
### 💡 Future Improvements
```
Analyze live drone footage for instant disease detection.
Provide farmers with a mobile-friendly interface.
Send automated alerts and treatment recommendations.
Scale the system using cloud infrastructure.
```
