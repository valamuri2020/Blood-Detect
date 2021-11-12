import os
import sys
import numpy as np
from flask import Flask, request
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import shutil

app = Flask(__name__)
IMAGE_SHAPE = (130, 130, 3)

model = load_model(os.getenv("MODEL_PATH"), compile=True)


def cleanup():
    # remove all image files on cleanup
    shutil.rmtree(os.getenv("SAVE_IMAGE_PATH"))

def preprocess(filepath):
    # load the image
    image_ = image.load_img(filepath, target_size=IMAGE_SHAPE)
    # get image array
    image_array = image.img_to_array(image_)
    # expand 0th dimension to be "1"
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.route("/predict", methods=["POST"])
def predict():
    
    if 'file' not in request.files:
        app.logger.debug("File not found")
        return {"data": "Error File not Found"}
    # get image file
    file = request.files["file"]
    filename = file.filename
    filepath = str(os.path.join(os.getenv("SAVE_IMAGE_PATH"), filename))
    # save image to folder
    file.save(filepath)
    # preprocess image, returns image array
    img = preprocess(filepath)
    # predict on image
    prediction = model.predict(img)
    
    prediction_text = "Infected" if prediction[0][0] == 0 else "Healthy"
    return {"data": prediction_text}


if __name__ == "__main__":
    app.run(debug=True)