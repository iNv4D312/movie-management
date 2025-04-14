# Notflix - Movie Upload & Streaming Platform  

## Tech Stack Used 
- **Frontend:** Angular, TypeScript, SCSS  
- **Backend:** Django, Django REST Framework  
- **Database:** PostgreSQL  
- **Storage:** Cloudinary (for media hosting)  
- **Others:** Bootstrap for styling, RxJS for state management  

---

## Prerequisites  
Before setting up Notflix, ensure you have the following installed:  

### **Backend (Django API)**  
✔ Python 3.8+  
✔ PostgreSQL or SQLite  
✔ Pip & Virtual Environment (`venv`)  

### **Frontend (Angular)**  
✔ Node.js (Latest LTS)  
✔ Angular CLI (`npm install -g @angular/cli`)  
✔ Package Manager (`npm` or `yarn`)  

---

## Setup Instructions 

### **Backend Setup (Django API)**  
1️⃣ Clone the repository:  
```sh
git clone https://github.com/iNv4D312/notflix.git
cd notflix/backend

2️⃣ Create a virtual environment and install dependencies
python -m venv env
source env/bin/activate  # Mac/Linux
env\Scripts\activate     # Windows
pip install -r requirements.txt

3️⃣ Run migrations and start the server
python manage.py migrate
python manage.py runserver

Backend will now be running at http://127.0.0.1:8000/api/


### **Frontend Setup (Django API)**  
1️⃣ Navigate to the frontend directory
cd notflix/frontend

2️⃣ Install dependencies:
npm install


3️⃣ Start the development server:
ng serve --open


Frontend will now be running at http://localhost:4200/

#Known Issues & Limitations 
- File Upload: Uploading large video files may take time; compression needs optimization.
- Mobile UI: Some UI elements may need better responsive adjustments.
- Playback Issues: Browser compatibility for certain video formats might require additional settings.
- Authentication: No OAuth integration yet—login currently uses basic JWT authentication.


#How to Test File Upload & Video Playback
1️⃣ Navigate to Upload Movie section (/upload-movie)
2️⃣ Select a movie file and fill in required details
3️⃣ Click Upload Movie and wait for success confirmation
4️⃣ Once uploaded, navigate to Home Page, click a movie card
5️⃣ Click Play to stream the uploaded movie


# Watch Notflix in Action


# Found a bug or want to contribute? Open an issue or fork the repo!
# Enjoy streaming with Notflix!

