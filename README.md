# Malaria Detect

## Inspiration 💡

I wanted to dive deeper into image processing and learn about CNNs. The prospect of using Deep learning on images of blood cells was intriguing and pushed me to take on this project.

Malaria is a disease transmitted through the bite of infected mosquitoes that affects the red blood cells in our bodies. Although now rare in the U.S., it can be hard to identify malaria, which is why lab tests and imaging are always needed. This project aims to be a tool to more accurately and quickly diagnose the illness.

## What it does ⚙️

Malaria Detect is intended as a tool in the lab alongside the clinician. It accepts an image of a red blood cell and then applies a binary classification deep learning model to determine if the sample is infected with malaria.

|               Healthy Blood Cell               |                      Infected Blood Cell                      |
| :--------------------------------------------: | :-----------------------------------------------------------: |
| ![image](blood-detect/assets/healthy_cell.png) | ![image](blood-detect/assets/infected_cell_untransformed.png) |

## How I built it 🛠️

### The Web App

This web app runs on a **Flask** API server, complemented by an intuitive **React** frontend, with user authentication handled by **Firebase**. Once the user selects and confirms their sample, the image is sent to the backend via HTTP requests. There, it is preprocessed to fit the model's expected input. Then, the previously trained **TensorFlow** model is loaded and fed the preprocessed image. Once the model has made its prediction, it's sent to the frontend where the prediction is displayed.

### The Deep Learning Model

The model correctly classifies blood cells with an **accuracy** of **87%**. First, I performed exploratory data analysis to get an idea of what the images look like, their average size and other potentially relevant metrics. The high accuracy was partially thanks to artificially expanding the dataset to generate more training data. Labelled blood cell data aren't readily available. Learning how to augment a given data set, in this case, using rotations, shifts, reflections, zoom, and shears, enabled me to account for transformed versions of images that were otherwise absent in the training set. In the model architecture, I added dropout layers to reduce overfitting, and an early stopping callback to minimize validation loss. Lastly, once the model was trained on batches of images, it was saved for later use, and a classification report was generated for evaluation.

|             Infected Cell (Before Transformation)             |               Infected (After Transformation)               |
| :-----------------------------------------------------------: | :---------------------------------------------------------: |
| ![image](blood-detect/assets/infected_cell_untransformed.png) | ![image](blood-detect/assets/infected_cell_transformed.png) |

Notice the zoom, shear (cuts) and slight rotation in the transformed image.

Note: You can find my work developing the model in this [Google Colab notebook](https://colab.research.google.com/drive/1ZZgkpYXL33pKm4fZ-7tjoWiXDO9o_jUY?usp=sharing).

The following were used in this project:

- TensorFlow
- Scikit-Learn
- Pandas
- Matplotlib
- Numpy
- Flask
- Firebase
- React

## Challenges and Learnings 🧠

The biggest learnings from this project came from its challenges - working with image data. Having not previously worked with images to this extent, I learnt how to incorporate file previews, send and parse files in over REST APIs, and how images are represented in Python using Numpy arrays. Performing transformations on the dataset to generate new data was a new practice I found interesting as well. Lastly, deploying the model took quite a bit of patience due to many errors that came up, but it served as a good learning experience.

## Next Steps 🚀

I'd like to host the model on Google's AI Platform, from where Cloud Functions can be used to preprocess and pass images to the model whenever they are uploaded to Cloud Firestore. Then, these predictions will be available at an API endpoint that React can pull the predictions from. In a nutshell, I'd like to leverage the power of the Cloud to turn this into a serverless application to improve scalability.
