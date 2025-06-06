import os
from PIL import Image
import piexif
import random

def extract_gps(img_path):
    try:
        exif_dict = piexif.load(img_path)
        gps = exif_dict.get('GPS', {})
        if gps:
            lat = gps[2][0][0] / gps[2][0][1]
            lon = gps[4][0][0] / gps[4][0][1]
            return {'lat': lat, 'lon': lon}
    except Exception as e:
        print(f"Error extracting GPS: {e}")
    return {'lat': random.uniform(20, 30), 'lon': random.uniform(70, 80)}

def process_folder(folder_path):
    result = []
    for file in os.listdir(folder_path):
        if file.endswith(('.jpg', '.jpeg', '.png')):
            path = os.path.join(folder_path, file)
            gps = extract_gps(path)

            # Simulated prediction logic
            is_diseased = 'diseased' in file.lower()

            result.append({
                'filename': file,
                'lat': gps['lat'],
                'lon': gps['lon'],
                'status': 'Diseased' if is_diseased else 'Healthy'
            })
    return result
