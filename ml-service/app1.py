import os
import zipfile
import io
import uuid
import base64
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import piexif
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
MODEL_PATH = 'model/defect_detection.keras'  # Replace with your actual path

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model
model = load_model(MODEL_PATH)

# Helper to get GPS from EXIF
def get_gps_from_exif(img_path):
    try:
        exif_dict = piexif.load(img_path)
        gps = exif_dict.get("GPS", {})

        def convert_to_degrees(value):
            d, m, s = value
            return d[0]/d[1] + m[0]/m[1]/60 + s[0]/s[1]/3600

        lat = convert_to_degrees(gps[2]) if 2 in gps else None
        if gps.get(1) == b'S': lat = -lat
        lon = convert_to_degrees(gps[4]) if 4 in gps else None
        if gps.get(3) == b'W': lon = -lon

        return lat, lon
    except:
        return None, None

# Helper to preprocess image
def preprocess_image(img_path):
    img = load_img(img_path, target_size=(150, 150))
    img = img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/predict', methods=['POST'])
def predict_from_zip():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    zip_id = str(uuid.uuid4())
    extract_path = os.path.join(UPLOAD_FOLDER, zip_id)
    os.makedirs(extract_path, exist_ok=True)

    # Unzip the uploaded file
    with zipfile.ZipFile(io.BytesIO(file.read())) as z:
        z.extractall(extract_path)

    results = []
    lats, lons, colors = [], [], []

    for root, _, files in os.walk(extract_path):
        for fname in files:
            if fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                fpath = os.path.join(root, fname)
                lat, lon = get_gps_from_exif(fpath)
                if lat is None or lon is None:
                    continue
                img = preprocess_image(fpath)
                pred = model.predict(img)[0][0]
                label = 'Diseased' if pred > 0.5 else 'Healthy'

                results.append({
                    'filename': fname,
                    'latitude': lat,
                    'longitude': lon,
                    'label': label,
                    'confidence': float(pred)
                })

                lats.append(lat)
                lons.append(lon)
                colors.append('red' if label == 'Diseased' else 'green')

    # Generate map plot
    plt.figure(figsize=(8, 6))
    plt.scatter(lons, lats, c=colors, alpha=0.7)
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Plant Health Map')
    plt.grid(True)

    map_path = os.path.join(extract_path, 'map.png')
    plt.savefig(map_path)
    plt.close()

    # Encode map as base64
    with open(map_path, "rb") as image_file:
        map_base64 = base64.b64encode(image_file.read()).decode('utf-8')

    return jsonify({
        'results': results,
        'map_image': map_base64
    })

if __name__ == '__main__':
    app.run(debug=True)
