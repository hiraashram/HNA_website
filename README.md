# 🌿 Hira National Academy – Full Stack Website

**Hira National Academy (HNA)** – Naturopathy & Yoga Academy Website

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | Flask (Python) |
| Database | Railway PostgreSQL |
| Image Storage | Cloudinary |
| Frontend Deploy | Vercel |
| Backend Deploy | Railway |
| Auth | JWT (Flask-JWT-Extended) |
| Password | bcrypt |
| Communication | WhatsApp API |

---

## 📂 Project Structure

```
hna-academy/
├── frontend/          # Next.js app (deploy to Vercel)
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── about/page.tsx     # About page
│   │   ├── courses/page.tsx   # Courses (4 tabs, dynamic)
│   │   ├── gallery/page.tsx   # Gallery (Cloudinary)
│   │   ├── consulting/page.tsx # Consultation + WhatsApp
│   │   └── admin/             # Admin panel (protected)
│   ├── components/            # Reusable components
│   └── lib/api.ts             # API + WhatsApp helpers
└── backend/           # Flask API (deploy to Railway)
    ├── app.py
    ├── models.py
    ├── config.py
    └── routes/
        ├── auth.py
        ├── courses.py
        ├── gallery.py
        ├── about.py
        └── contact.py
```

---

## 🚀 Setup Instructions

### 1. Backend (Flask)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and fill environment variables
cp .env.example .env
# Edit .env with your actual values

# Run locally
python app.py
```

**Backend .env variables:**
```
DATABASE_URL=postgresql://user:pass@host:5432/hna_academy
JWT_SECRET_KEY=your-super-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
WHATSAPP_NUMBER=918796309503
```

### 2. Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.local.example .env.local
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000   (or your Railway URL)
# NEXT_PUBLIC_WHATSAPP_NUMBER=918796309503

# Run dev server
npm run dev
```

---

## ☁️ Deployment

### Backend → Railway

1. Create Railway account → New Project → Deploy from GitHub
2. Add PostgreSQL plugin in Railway
3. Set environment variables in Railway settings
4. Railway will auto-detect Python; uses `gunicorn app:app`

**Add to backend:** `Procfile`
```
web: gunicorn app:app
```

### Frontend → Vercel

1. Push code to GitHub
2. Import repo in Vercel
3. Set root directory to `frontend/`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = your Railway backend URL
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `918796309503`
5. Deploy!

---

## 🔐 Admin Panel

**URL:** `/admin`

**Default credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change the password immediately after first login!**

The admin panel allows you to:
- ✅ Add / Edit / Delete courses (4 categories)
- ✅ Upload gallery images (to Cloudinary)
- ✅ Manage About page sections
- ✅ Add/remove student testimonials
- ✅ Show/hide any content instantly

---

## 📱 WhatsApp Integration

WhatsApp number: **+91 8796309503**

All "Enroll Now", "Book Appointment", and "Contact" buttons generate pre-filled WhatsApp messages. The floating WhatsApp button is visible on all pages.

---

## 📚 Course Categories

| Tab | Affiliation | Courses |
|---|---|---|
| ABPCP | Akhil Bharti Prakritik Chikitsa Parishad | C.E.N.Y., C.N.Y.T., DNYS |
| GNAP | Gandhi National Academy of Naturopathy | Chikitsa Sahayak, NDDY |
| Mess | Residential Programs | Wellness stays, yoga retreats |
| Computer | Skill Enhancement | BCC, ACA, DTP |

---

## 🎓 Scholarship Policy

- **Offline admission**: Scholarship available based on eligibility
- **Online admission**: Full fee, no scholarship
- Prominently displayed throughout the website

---

## 🎨 Design Theme

- **Colors**: Forest green + Warm amber + Cream
- **Fonts**: Playfair Display (headings) + Lato (body)
- **Style**: Nature-inspired, organic, calming
- **Responsive**: Mobile-first design

---

## 📍 Academy Details

- **Name**: Hira National Academy (HNA)
- **Address**: 121 Old Gandhi Nagar, Nehru Nagar 3, Ghaziabad – 201001
- **Phone/WhatsApp**: +91 8796309503
- **Ashram Est.**: 2010
- **Academy Registered**: 2016
- **Affiliations**: ABPCP + GNAP

---

## 🛠️ Cloudinary Setup

1. Create account at cloudinary.com
2. Go to Dashboard → Copy: Cloud Name, API Key, API Secret
3. Add to backend .env

Images are stored in the `hna_academy/` folder in Cloudinary.

---

## 🔧 Database Seeding

On first run, the Flask backend automatically:
1. Creates all database tables
2. Creates the default admin user (admin/admin123)

To seed default courses, call the seed function in `routes/courses.py` or add them via the Admin panel.
