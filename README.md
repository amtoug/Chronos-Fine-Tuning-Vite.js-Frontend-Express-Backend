⚙️ Important Note on Fine-Tuning

Before using the project, you must first execute the fine-tuning script located in:

src/FineTraining/fine_training_chronos.py


This will generate the fine-tuned model. Once finished, rename the output folder to something descriptive like:

FineTraining_A_Project_by_Abdessamad_Amtoug


The output will contain the file:

model.safetensors


which is used by the backend API for predictions.

📝 Project Summary

This project is strongly inspired (almost replicated) from a Machine Learning Engineering tutorial on YouTube. It has been customized for my workflow with additional preprocessing and a UI/Backend setup.

It performs:

Advanced data preprocessing (PCA, scaling, feature engineering)

Fine-tuning of Chronos for time-series forecasting

Modern Vite.js frontend to visualize predictions

Lightweight Express.js backend exposing model output as a JSON API

Workflow: raw data → preprocessing → Chronos fine-tuning → API → UI

📂 Project Structure
Chronos-Fine-Tuning-Vite.js-Frontend-Express-Backend/
│
├── ExpressAPI/           # backend
│   ├── index.js          # Express server
│   ├── data.json
│   └── package.json
│
├── frontend/             # Vite.js frontend
│   ├── src/
│   └── package.json
│
├── data/
│   └── eco2mix_Data.csv  # training dataset after preprocessing
│
└── src/FineTraining/     # Fine-tuned Chronos model (rename after training)

🚀 How to Run

Backend:

cd ExpressAPI
npm install
npm start


Frontend:

cd frontend
npm install
npm run dev


Use the API/UI:

Backend exposes prediction API at http://localhost:3000/predict

Frontend reads data from the API and displays graphs, confidence intervals, and model outputs

🧠 Fine-Tuned Model

Chronos model trained on 48h + 48h forecasting

Preprocessing includes PCA & standardization

Model saved as model.safetensors inside FineTraining_A_Project_by_Abdessamad_Amtoug

✨ Author

Abdessamad Amtoug
Master’s student in Data Science & Cybersecurity