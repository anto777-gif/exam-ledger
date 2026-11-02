# AI Exam Question Predictor

> **Tagline:** Learn Smart. Teach Better. Prepare Confidently.

A full-stack, production-ready educational web application built with Next.js, TypeScript, and Tailwind CSS. The system provides dedicated portals for **Teachers** and **Students**:
- **AI Teaching Planner (Teachers):** Parses course syllabuses (PDF, DOCX, TXT, or direct text), estimates total instructional workload, and generates a structured, pedagogically sound six-session teaching plan with learning objectives, practical lab ideas, and classroom revision questions.
- **AI Important Question Predictor (Students):** Predicts high-yield examination questions (1, 2, 5, 10, 14, 16 marks) with transparent 0–100 heuristic importance scores, 5-star ratings, syllabus source groundings, and suggested answer outlines.

---

## 🌟 Key Features

1. **Role-Based Access Control (RBAC):**
   - **Teacher Dashboard:** Syllabus document upload, automatic structure extraction, workload estimation, 6-session teaching plan inspection, and syllabus management.
   - **Student Dashboard:** Subject browser, 8 pre-seeded demonstration curricula, topic-level question configuration, deduplicated question generation, print-friendly revision view, and request history.
   - Complete server-side role enforcement preventing students from uploading syllabuses and teachers from generating student questions.
2. **Deterministic & Grounded AI Engine:**
   - Zero hallucination: questions are generated strictly from the units and topics present in the uploaded syllabus.
   - Deduplication: exact and semantic duplicates are systematically filtered.
   - Transparent Heuristic Scoring: 0–100 relevance scoring mapped to 1–5 star ratings.
3. **Six-Session Teaching Plan:**
   - Differentiates total estimated curriculum requirement from the requested six-session schedule.
   - Flags heavy sessions and condensed topics requiring extra laboratory or lecture time.
4. **Offline Demo Mode:**
   - Pre-seeded with 8 standard Computer Science curricula (Software Engineering, Computer Networks, Machine Learning, NLP, Computer Vision, DBMS, OS, Data Structures).
   - Functions autonomously without requiring paid external AI API keys.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Document Extractors:** `pdf-parse` (PDF) and `mammoth` (DOCX)
- **Security & Auth:** JWT tokens (`jsonwebtoken`), password hashing with `bcryptjs`, HTTP-only secure cookies
- **Validation:** Zod schemas
- **Storage:** Relational JSON file storage in `./data/` (easily adaptable to PostgreSQL/Supabase)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Installation
```bash
git clone <repository-url>
cd newpro
npm install
```

### 3. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```
*(Defaults in `.env.example` are pre-configured to work out of the box).*

### 4. Running the Application

#### Frontend (Next.js):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

#### Dedicated Python Backend (FastAPI):
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Interactive Swagger API documentation is available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

#### Docker & Docker Compose:
To spin up both frontend and backend in isolated production containers:
```bash
docker compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000) (Swagger: [http://localhost:8000/docs](http://localhost:8000/docs))

---

## 🔑 Pre-Seeded Demonstration Accounts

| Role | Email | Password | Dashboard Features |
| :--- | :--- | :--- | :--- |
| **Teacher** | `teacher@university.edu` | `teacher123` | Syllabus upload, 6-session teaching plans, syllabus management |
| **Student** | `student@university.edu` | `student123` | 8 Demo subjects, topic selection, question prediction & history |

*(Quick autofill buttons are available on the [Login Page](http://localhost:3000/login)).*

---

## 🧪 Testing

Run the automated test suite verifying syllabus extraction, session planning, question generation, and deduplication:
```bash
npx tsx scripts/test-suite.ts
```

---

## 📁 Project Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/           # Authentication endpoints (login, register, me)
│   │   │   ├── syllabuses/     # Syllabus upload, listing, and deletion
│   │   │   └── questions/      # Question generation & student history
│   │   ├── login/              # Login & registration page
│   │   ├── student/            # Student portal & subject study view
│   │   ├── teacher/            # Teacher dashboard & syllabus upload modal
│   │   ├── layout.tsx          # Root layout with Inter font & metadata
│   │   └── page.tsx            # Modern landing page
│   ├── components/
│   │   ├── Logo.tsx            # Custom SVG branding logo
│   │   ├── Navbar.tsx          # Role-aware responsive navigation bar
│   │   ├── Footer.tsx          # Footer with responsible AI disclaimer
│   │   ├── StarRating.tsx      # Star rating indicator
│   │   └── TeachingPlanTimeline.tsx # Interactive 6-session teaching plan
│   ├── context/
│   │   └── AuthContext.tsx     # Client session context
│   ├── lib/
│   │   ├── auth.ts             # JWT token signing & verification
│   │   ├── db.ts               # Relational persistent storage
│   │   ├── demoData.ts         # 8 pre-seeded demonstration subjects
│   │   ├── parser.ts           # PDF, DOCX, TXT text extraction
│   │   ├── questionPredictor.ts# Prediction engine, deduplication & scoring
│   │   └── syllabusAnalyzer.ts # Syllabus parser & 6-session teaching planner
│   └── types/
│       └── index.ts            # Core TypeScript domain models
├── data/                       # Persistent JSON storage for syllabuses & requests
├── scripts/
│   └── test-suite.ts           # Automated domain verification suite
├── .env.example                # Sample environment variables
└── README.md                   # Project documentation
```

---

## ⚖️ Responsible AI Disclaimer
Question predictions and importance scores represent curriculum-derived heuristic estimates, not guaranteed university exam papers. The platform is designed strictly as an academic study and instructional planning aid.
