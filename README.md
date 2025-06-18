<h1 align="center">🧼 Background Remover</h1>

<p align="center">
  A web-based tool to remove and replace backgrounds from images using deep learning — clean, fast, and easy.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" />
  <img src="https://img.shields.io/github/languages/top/jtareen/background-remover?style=flat-square" />
  <img src="https://img.shields.io/github/license/jtareen/background-remover?style=flat-square" />
</p>

<!-- <div align="center">
  <img src="docs/demo.gif" alt="App Demo" style="max-width: 100%;" />
</div> -->

---

## Overview

**Background Remover** is a full-stack web application built with **React** and **Flask** that enables users to:
- Automatically remove the background of uploaded images using a pre-trained deep learning model.
- Replace the removed background with a solid color.
- Preview and download the final image — all in a few clicks.

---

## Features

- Automatic background removal using a segmentation model  
- Change background to a solid color  
- Download final image with or without new background  
- Responsive and interactive UI  
- Light and Dark mode support  

---

## Tech Stack

| Frontend       | Backend        | ML/Processing     | Tools         |
|----------------|----------------|-------------------|---------------|
| ReactJS        | Python, Flask  | OpenCV, Pillow    | VS Code       |
| JavaScript     | RESTful APIs   | Pre-trained Model | Git/GitHub    |

---

## Project Structure

````

background-remover/
├── frontend/              # React frontend
│   ├── public/
│   └── src/
├── backend/               # Flask backend
│   ├── app/
│   ├── README.md
│   └── requirements.txt
├── .gitignore
└── README.md

````

---

## Getting Started


### Cloning Repo
```bash
git clone https://github.com/jtareen/background-remover.git
cd background-remover
```

### Backend Setup (Flask)
```bash
cd backend
python -m venv env
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py                 # Runs on http://localhost:5000
```

### Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev                     # Runs on http://localhost:5173
```

Make sure both frontend and backend are running. Configure **CORS** in the backend for local development.

---

## How It Works

1. User uploads an image through the web UI.
2. Image is sent to the Flask API for background removal.
3. A transparent version is returned and previewed.
4. Optionally, the user applies a solid background color.
5. Edited image is generated and can be downloaded instantly.

---

## Screenshots

<div align="center"> <table> <tr> <td><img src="docs/Demo%20Screenshots/screenshot1.png" width="500px" alt="Upload Screen (Light)"/></td> <td><img src="docs/Demo%20Screenshots/screenshot2.png" width="500px" alt="Upload Screen (Dark)"/></td> </tr> <tr> <td align="center">Upload Screen (Light)</td> <td align="center">Upload Screen (Dark)</td> </tr> <tr> <td><img src="docs/Demo%20Screenshots/screenshot3.png" width="500px" alt="Background Removed"/></td> <td><img src="docs/Demo%20Screenshots/screenshot4.png" width="500px" alt="Color Picker"/></td> </tr> <tr> <td align="center">Background Removed</td> <td align="center">Color Picker</td> </tr> <tr> <td><img src="docs/Demo%20Screenshots/screenshot5.png" width="280px" alt="Upload Screen (Mobile View)"/></td> <td><img src="docs/Demo%20Screenshots/screenshot6.png" width="280px" alt="Editor Screen (Mobile View)"/></td> </tr> <tr> <td align="center">Upload Screen (Mobile View)</td> <td align="center">Editor Screen (Mobile View)</td> </tr> </table> </div>

---

## Future Improvements

* Upload custom background images
* Add image editing tools (crop, resize, filters)
* Undo/redo support
* Drag and drop image input

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more info.

---

## About

This project was developed as part of the **Digital Image Processing** course during the **6th semester** of BS Computer Science.
Feel free to fork and use this code for your own academic or personal projects.

**Author:** [Jawad Tareen](https://github.com/jtareen)

---

## Show Your Support

If you liked this project, consider giving it a ⭐ on GitHub or sharing it with others!