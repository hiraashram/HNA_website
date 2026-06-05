# 🌿 Hira Nisargopchar Ashram – Official Website

**हीरा निर्सगोपचार आश्रम** | Naturopathy & Yoga Academy, Ghaziabad

🌐 Live: [hiraashram.com](https://hiraashram.com)

---

## 🏗️ Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS | Railway |
| Backend | Flask (Python 3.13) | Railway |
| Database | PostgreSQL | Railway |
| Image Storage | Cloudinary | Cloudinary |
| Authentication | JWT (Flask-JWT-Extended) | — |
| Password Security | bcrypt | — |
| Communication | WhatsApp API | — |
| Domain | hiraashram.com | GoDaddy |

> **All services (Frontend + Backend + Database) are hosted on Railway.**

---

## 📂 Project Structure

```
hna-academy/
├── frontend/                        # Next.js app → Railway (serene-fulfillment)
│   ├── app/
│   │   ├── page.tsx                 # Home page
│   │   ├── about/page.tsx           # About Academy
│   │   ├── courses/page.tsx         # Courses (5 tabs – dynamic)
│   │   ├── gallery/page.tsx         # Gallery (Cloudinary images)
│   │   ├── consulting/page.tsx      # Consultation + WhatsApp
│   │   ├── admission/page.tsx       # Google Form admission redirect
│   │   └── admin/                   # Protected Admin Panel
│   │       ├── page.tsx             # Login
│   │       ├── layout.tsx           # Sidebar layout
│   │       ├── dashboard/page.tsx   # Dashboard
│   │       ├── courses/page.tsx     # Manage courses
│   │       ├── gallery/page.tsx     # Manage gallery
│   │       ├── about/page.tsx       # Manage about sections
│   │       └── testimonials/page.tsx# Manage testimonials
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppFloat.tsx
│   │   ├── CourseCard.tsx
│   │   └── SectionHeader.tsx
│   ├── lib/
│   │   └── api.ts                   # API calls + WhatsApp helpers
│   ├── public/
│   │   ├── logo.png                 # Academy logo
│   │   └── owner.png                # Founder photo
│   └── netlify.toml                 # (kept for reference, not used)
│
└── backend/                         # Flask API → Railway (HNA_website)
    ├── app.py                       # Main Flask app
    ├── models.py                    # Database models
    ├── config.py                    # Configuration
    ├── extensions.py                # db + jwt instances
    ├── requirements.txt
    ├── Procfile                     # Railway: gunicorn app:app
    └── routes/
        ├── auth.py                  # Login / JWT
        ├── courses.py               # Course CRUD
        ├── gallery.py               # Gallery + Cloudinary
        ├── about.py                 # About sections + testimonials
        └── contact.py               # Contact info
```

---

## 🚀 Local Setup

### Backend (Flask)

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Fill in your actual values

# Run backend
python app.py
# Runs on http://localhost:5000
```

**`.env` file:**
```env
DATABASE_URL=postgresql://postgres:PASSWORD@viaduct.proxy.rlwy.net:PORT/railway
JWT_SECRET_KEY=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
WHATSAPP_NUMBER=918796309503
```

### Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local
# Fill in:
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_WHATSAPP_NUMBER=918796309503

# Run frontend
npm run dev
# Runs on http://localhost:3000
```

---

## ☁️ Railway Deployment (All Services)

All three services are deployed on **Railway** under project: `resilient-reprieve`

| Service | Name | URL |
|---|---|---|
| Frontend | serene-fulfillment | hiraashram.com |
| Backend | HNA_website | hnawebsite-production.up.railway.app |
| Database | Postgres | Internal Railway PostgreSQL |

### Deploy Backend

1. Railway → Project → **HNA_website** service
2. Root Directory: `backend`
3. Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`
4. Environment Variables:
```
DATABASE_URL          = postgresql://postgres:...@postgres.railway.internal:5432/railway
JWT_SECRET_KEY        = your-secret-key
CLOUDINARY_CLOUD_NAME = your-cloud-name
CLOUDINARY_API_KEY    = your-api-key
CLOUDINARY_API_SECRET = your-api-secret
WHATSAPP_NUMBER       = 918796309503
```

### Deploy Frontend

1. Railway → Project → **serene-fulfillment** service
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Start Command: `npm run start`
5. Environment Variables:
```
NEXT_PUBLIC_API_URL         = https://hnawebsite-production.up.railway.app
NEXT_PUBLIC_WHATSAPP_NUMBER = 918796309503
```

### Custom Domain Setup (GoDaddy → Railway)

| Type | Name | Value |
|---|---|---|
| A | @ | 69.46.46.81 |
| CNAME | www | cxrypehm.up.railway.app |
| TXT | _railway-verify | railway-verify=121cdc8efe7061d270d29ac24a15063... |

---

## 🔐 Admin Panel

**URL:** `hiraashram.com/admin`

**Login:**
- Username: `hiraashram`
- Password: *(stored in Railway PostgreSQL)*

**Admin can manage:**
- ✅ Add / Edit / Delete / Hide courses
- ✅ Upload gallery images (Cloudinary)
- ✅ Edit About page sections
- ✅ Add / Delete student testimonials
- ✅ All changes live instantly

---

## 📚 Course Categories

| Tab Key | Label | Affiliation |
|---|---|---|
| `DNYS` | DNYS Courses | Akhil Bharti Prakritik Chikitsa Parishad (ABPCP) |
| `NDDY` | NDDY Courses | Gandhi National Academy of Naturopathy (GNAP) |
| `MSME` | MSME Courses | Residential & Self Courses |
| `COMPUTER` | Computer Courses | Skill Enhancement |
| `University` | University Courses | Mangalayatan University |

---

## 📱 WhatsApp Integration

**WhatsApp Number:** +91 8796309503

- **Enroll Now** → WhatsApp with course enquiry
- **Book Appointment** → WhatsApp appointment message
- **Consulting page** → Custom concern message
- **Floating button** → Visible on all pages

---

## 📝 Admission Form

Google Form (supports file upload):
**https://docs.google.com/forms/d/e/1FAIpQLSeUnDQfZBUjsa58F4ANKlzDX9rKO4u-jiYphPrhWsHpoglQvA/viewform**

Form responses go to: `info.hiraashram@gmail.com`

---

## 🎓 Scholarship Policy

| Mode | Scholarship |
|---|---|
| Offline Admission (visit academy) | ✅ Available based on eligibility |
| Online Admission | ❌ No scholarship – full fee |

---

## 📍 Academy Details

| Field | Details |
|---|---|
| **Name** | Hira Nisargopchar Ashram / Hira National Academy |
| **Address** | 121 New Gandhi Nagar, Nehru Nagar 3, Ghaziabad – 201001, U.P. |
| **Phone/WhatsApp** | +91 8796309503 |
| **Email** | info.hiraashram@gmail.com |
| **Ashram Founded** | 2010 |
| **Academy Registered** | 2016 |
| **Affiliations** | ABPCP + Gandhi National Academy of Naturopathy |
| **University** | Mangalayatan University |

---

## 🔗 Important Links

| Service | Link |
|---|---|
| Live Website | https://hiraashram.com |
| Admin Panel | https://hiraashram.com/admin |
| Backend API | https://hnawebsite-production.up.railway.app |
| Admission Form | https://docs.google.com/forms/d/e/1FAIpQLSeUnDQfZBUjsa58F4ANKlzDX9rKO4u-jiYphPrhWsHpoglQvA/viewform |
| YouTube | https://www.youtube.com/@hiranisargopcharashram1449 |
| Facebook | https://www.facebook.com/hiranisargopchar |
| Railway Dashboard | https://railway.app |
| Cloudinary Dashboard | https://cloudinary.com |

---

## 📞 Social Media

- **YouTube:** Hira Nisargopchar Ashram
- **Facebook:** Hira Nisargopchar
- **WhatsApp:** +91 8796309503
- **Email:** info.hiraashram@gmail.com

---

*Built with ❤️ for Hira Nisargopchar Ashram, Ghaziabad*