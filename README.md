# 🌿 Hira Nisargopchar Ashram – Official Website

**हीरा निर्सगोपचार आश्रम** | Naturopathy & Yoga Academy, Ghaziabad

🌐 Live: [hiraashram.com](https://hiraashram.com)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS |
| Backend | Flask (Python 3.13) |
| Database | Railway PostgreSQL |
| Image Storage | Cloudinary |
| Frontend Hosting | Netlify |
| Backend Hosting | Railway |
| Authentication | JWT (Flask-JWT-Extended) |
| Password Security | bcrypt |
| Communication | WhatsApp API |

---

## 📂 Project Structure

```
hna-academy/
├── frontend/                        # Next.js app → deployed on Netlify
│   ├── app/
│   │   ├── page.tsx                 # Home page
│   │   ├── about/page.tsx           # About Academy
│   │   ├── courses/page.tsx         # Courses (5 tabs – dynamic)
│   │   ├── gallery/page.tsx         # Gallery (Cloudinary images)
│   │   ├── consulting/page.tsx      # Consultation + WhatsApp
│   │   ├── admission/page.tsx       # Google Form admission
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
│   └── public/
│       ├── logo.png                 # Academy logo
│       └── owner.png                # Founder photo
│
└── backend/                         # Flask API → deployed on Railway
    ├── app.py                       # Main Flask app
    ├── models.py                    # Database models
    ├── config.py                    # Configuration
    ├── extensions.py                # db + jwt instances
    ├── requirements.txt
    ├── Procfile                     # Railway deployment
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
# Fill in your actual values in .env

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

## ☁️ Deployment

### Backend → Railway

1. Push code to GitHub
2. Go to railway.app → New Project → GitHub Repo
3. Set **Root Directory** to `backend`
4. Add environment variables in Railway → Variables tab:
   - `DATABASE_URL` = internal PostgreSQL URL from Railway
   - `JWT_SECRET_KEY` = your secret key
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `WHATSAPP_NUMBER` = `918796309503`
5. Railway auto-deploys using `Procfile`
6. Settings → Networking → Generate Domain → copy URL

### Frontend → Netlify

1. Push code to GitHub
2. Go to netlify.com → Add New Site → GitHub
3. Set **Base directory** to `frontend`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = your Railway backend URL
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `918796309503`
5. Deploy!

### Custom Domain (GoDaddy → Netlify)

| DNS Record | Type | Name | Value |
|---|---|---|---|
| A Record | A | @ | 75.2.60.5 |
| CNAME | CNAME | www | your-site.netlify.app |

---

## 🔐 Admin Panel

**URL:** `hiraashram.com/admin`

**Login credentials:**
- Username: `hiraashram`
- Password: *(set in database)*

**Admin can manage:**
- ✅ Add / Edit / Delete / Hide courses
- ✅ Upload gallery images (stored on Cloudinary)
- ✅ Edit About page sections
- ✅ Add / Delete student testimonials
- ✅ All changes reflect on website instantly

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

- Every **Enroll Now** button → opens WhatsApp with pre-filled course enquiry
- **Book Appointment** → pre-filled appointment message
- **Consulting page** → custom message with concern
- **Floating button** → visible on all pages
- **Admission Form** → Google Form with document upload

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

## 🛠️ Cloudinary Setup

1. Sign up at cloudinary.com (free)
2. Dashboard → copy Cloud Name, API Key, API Secret
3. Add to backend `.env`
4. Images upload to `hna_academy/` folder automatically

---

## 🔗 Important Links

| Service | Link |
|---|---|
| Live Website | https://hiraashram.com |
| Admin Panel | https://hiraashram.com/admin |
| Admission Form | https://docs.google.com/forms/d/e/1FAIpQLSeUnDQfZBUjsa58F4ANKlzDX9rKO4u-jiYphPrhWsHpoglQvA/viewform |
| Railway Backend | https://hnawebsite-production.up.railway.app |
| YouTube | https://www.youtube.com/@hiranisargopcharashram1449 |
| Facebook | https://www.facebook.com/hiranisargopchar |

---

## 📞 Social Media

- **YouTube:** Hira Nisargopchar Ashram
- **Facebook:** Hira Nisargopchar
- **WhatsApp:** +91 8796309503

---

*Built with ❤️ for Hira Nisargopchar Ashram, Ghaziabad*