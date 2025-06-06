# from flask import Flask, render_template, request, redirect, url_for, Response
# import cv2
# import tensorflow as tf
# import numpy as np
# from keras.preprocessing import image
# import os

# app = Flask(__name__)

# # Load the pre-trained model
# model = tf.keras.models.load_model("C:/Users/Admin/OneDrive/Desktop/CROPDISEASEMAIN/kobu/model/defect_detection.keras")
# expected_shape = model.input_shape[1:3]  # Model's input shape (e.g., (150, 150))

# UPLOAD_FOLDER = 'static/uploads/'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Prediction function for image
# def predict_image(file_path):
#     img = image.load_img(file_path, target_size=expected_shape)
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize

#     prediction = model.predict(img_array)[0]
#     class_id = np.argmax(prediction)
#     confidence = prediction[class_id]
#     label = "Defective" if class_id == 1 else "Not Defective"
#     return label, confidence

# # Route for the homepage
# @app.route('/')
# def index():
#     return render_template('index.html')

# # Route for image upload and prediction
# @app.route('/upload', methods=['POST'])
# def upload_image():
#     if 'image' not in request.files:
#         return redirect(request.url)

#     file = request.files['image']
#     if file.filename == '':
#         return redirect(request.url)

#     if file:
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#         file.save(file_path)

#         # Predict and return results
#         label, confidence = predict_image(file_path)
#         return render_template('result.html', label=label, confidence=confidence, image_url=file_path)

# # Generator function for live video feed
# def generate_video_feed():
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         yield b"Cannot open camera"
#         return

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Resize the frame for model input
#         img_array = cv2.resize(frame, expected_shape)
#         img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize

#         # Make prediction
#         prediction = model.predict(img_array)[0]
#         class_id = np.argmax(prediction)
#         confidence = prediction[class_id]

#         # Determine label and color
#         label = "Defective" if class_id == 1 else "Not Defective"
#         color = (0, 0, 255) if confidence < 0.7 else (0, 255, 0)  # Red for low confidence

#         # Annotate frame
#         cv2.putText(
#             frame,
#             f"{label} ({confidence:.2f})",
#             (10, 30),
#             cv2.FONT_HERSHEY_SIMPLEX,
#             1,
#             color,
#             2,
#         )
#         cv2.rectangle(
#             frame,
#             (50, 50),
#             (frame.shape[1] - 50, frame.shape[0] - 50),
#             color,
#             3,
#         )

#         # Encode the frame as JPEG
#         _, buffer = cv2.imencode('.jpg', frame)
#         frame_bytes = buffer.tobytes()

#         # Yield the frame with boundary content type for streaming
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

#     cap.release()

# # Route for live video feed
# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_video_feed(), mimetype='multipart/x-mixed-replace; boundary=frame')

# # Run the app
# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify, Response
import os, cv2, numpy as np
import tensorflow as tf
from keras.preprocessing import image
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("model/defect_detection.keras")
expected_shape = model.input_shape[1:3]
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found'}), 400

    file = request.files['image']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    img = image.load_img(file_path, target_size=expected_shape)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)[0]
    class_id = np.argmax(prediction)
    confidence = float(prediction[class_id])
    label = "Defective" if class_id == 1 else "Not Defective"

    return jsonify({
        'label': label,
        'confidence': confidence
    })

@app.route('/video_feed')
def video_feed():
    def generate():
        cap = cv2.VideoCapture(0)
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            img_array = cv2.resize(frame, expected_shape)
            img_array = np.expand_dims(img_array, axis=0) / 255.0
            prediction = model.predict(img_array)[0]
            class_id = np.argmax(prediction)
            confidence = prediction[class_id]
            label = "Defective" if class_id == 1 else "Not Defective"
            color = (0, 0, 255) if confidence < 0.7 else (0, 255, 0)

            cv2.putText(frame, f"{label} ({confidence:.2f})", (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
            cv2.rectangle(frame, (50, 50), (frame.shape[1] - 50, frame.shape[0] - 50),
                          color, 3)

            _, buffer = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        cap.release()

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(port=5001, debug=True)
