import os
import sys
import numpy as np
from flask import Flask, request
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

app = Flask(__name__)
IMAGE_SHAPE = (130, 130, 3)

def cleanup():
    for file in os.scandir(os.getenv("SAVE_IMAGE_PATH")):
        os.remove(file.path)

def preprocess(filepath):
    image_ = image.load_img(filepath, target_size=IMAGE_SHAPE)
    image_array = image.img_to_array(image_)
    image_array = np.expand_dims(image_array, axis=0)
    print("preprocessing done!".upper())
    return image_array

@app.route("/predict", methods=["POST"])
def predict():
    
    if 'file' not in request.files:
        app.logger.debug("File not found")
        return {"data": "Error File not Found"}
    
    file = request.files["file"]
    filename = file.filename
    print("FILENAME: ", filename)
    filepath = str(os.path.join("../../images", filename))
    file.save(filepath)
    print("FILENAME: ", filename, "SAVED!")

    img = preprocess(filepath)
    print("IMAGE ARRAY", img)

    # model = load_model('malaria_detector.h5')
    print("EXISTS", os.path.exists("malaria_detector.h5"))
    # prediction = model.predict(img)
    # prediction_text = "Infected" if prediction[0][0] == 0 else "Healthy"
    # return {"data": prediction_text}

    return {"data": "prediction route working!!"}

if __name__ == "__main__":
    app.run(debug=True)