import time
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form, Query, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from schemas import (
    UserRegister,
    UserLogin,
    UserResponse,
    TokenResponse,
    SyllabusResponse,
    QuestionGenerateRequest,
    QuestionRequestRecord
)
from db import (
    get_all_users,
    get_user_by_email,
    get_user_by_id,
    create_user,
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    get_all_syllabuses,
    get_syllabus_by_id,
    get_syllabuses_by_teacher,
    get_published_syllabuses,
    save_syllabus,
    delete_syllabus,
    get_requests_by_student,
    save_request
)
from parser import extract_text_from_file, clean_document_text
from analyzer import parse_syllabus_structure
from predictor import generate_predicted_questions

app = FastAPI(
    title="AI Exam Question Predictor - FastAPI Backend",
    version="1.0.0",
    description="Dedicated Python FastAPI backend for syllabus analysis, 6-session planning, and AI question prediction."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token header missing"
        )
    
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization token format"
        )
    
    token = parts[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token"
        )
    
    user = get_user_by_id(payload.get("userId"))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "AI Exam Question Predictor FastAPI Service"}

# ----------------- AUTHENTICATION -----------------

@app.post("/api/auth/register", response_model=TokenResponse)
def register(user_in: UserRegister):
    existing = get_user_by_email(user_in.email)
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    
    new_user = {
        "id": f"usr-{int(time.time() * 1000)}-{random_str()}",
        "name": user_in.name,
        "email": user_in.email,
        "role": user_in.role,
        "passwordHash": hash_password(user_in.password),
        "createdAt": datetime.utcnow().isoformat() + "Z"
    }
    create_user(new_user)
    token = create_access_token(new_user["id"], new_user["role"], new_user["email"])
    
    return {
        "message": "Account created successfully",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"],
            "role": new_user["role"]
        },
        "token": token
    }

@app.post("/api/auth/login", response_model=TokenResponse)
def login(user_in: UserLogin):
    user = get_user_by_email(user_in.email)
    if not user or not verify_password(user_in.password, user.get("passwordHash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token(user["id"], user["role"], user["email"])
    return {
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        },
        "token": token
    }

@app.get("/api/auth/me")
def get_me(user: dict = Depends(get_current_user)):
    return {
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }

# ----------------- SYLLABUSES -----------------

@app.get("/api/syllabuses")
def list_syllabuses(
    role: Optional[str] = Query(None),
    authorization: Optional[str] = Header(None)
):
    current_user = None
    if authorization:
        try:
            current_user = get_current_user(authorization)
        except Exception:
            current_user = None

    if role == "student" or (current_user and current_user["role"] == "student") or not current_user:
        return {"syllabuses": get_published_syllabuses()}
    
    teacher_syls = get_syllabuses_by_teacher(current_user["id"])
    demo_syls = [s for s in get_all_syllabuses() if s.get("isDemo") is True]
    return {
        "teacherSyllabuses": teacher_syls,
        "demoSyllabuses": demo_syls,
        "allVisible": teacher_syls + demo_syls
    }

@app.get("/api/syllabuses/{syllabus_id}")
def get_single_syllabus(syllabus_id: str):
    s = get_syllabus_by_id(syllabus_id)
    if not s:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    return {"syllabus": s}

@app.post("/api/syllabuses")
async def upload_syllabus(
    subjectName: str = Form(...),
    subjectCode: Optional[str] = Form(None),
    department: Optional[str] = Form(None),
    semester: Optional[str] = Form(None),
    university: Optional[str] = Form(None),
    requestedSessions: int = Form(6),
    directText: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    user: dict = Depends(get_current_user)
):
    if user["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Forbidden: Only verified Teachers are permitted to upload syllabuses.")

    raw_text = (directText or "").strip()
    file_type = "text"
    original_filename = None

    if file and file.filename:
        original_filename = file.filename
        content = await file.read()
        if len(content) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File exceeds 10MB limit.")
        
        ext = file.filename.split(".")[-1].lower()
        if ext == "pdf":
            file_type = "pdf"
        elif ext == "docx":
            file_type = "docx"
        elif ext == "txt":
            file_type = "txt"
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or TXT.")

        try:
            extracted = extract_text_from_file(content, file.filename)
            raw_text = (extracted + "\n" + raw_text).strip()
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"Extraction error: {str(e)}")

    if len(raw_text) < 20:
        raise HTTPException(status_code=400, detail="Insufficient syllabus content. Provide at least 20 characters of curriculum text.")

    syllabus_id = f"syl-{int(time.time() * 1000)}-{random_str()}"
    analysis = parse_syllabus_structure(raw_text, syllabus_id, requestedSessions)

    new_syllabus = {
        "id": syllabus_id,
        "userId": user["id"],
        "subjectName": subjectName,
        "subjectCode": subjectCode,
        "department": department,
        "semester": semester,
        "university": university,
        "originalFileName": original_filename,
        "fileType": file_type,
        "rawText": raw_text,
        "status": "Completed",
        "version": "1.0",
        "units": analysis["units"],
        "teachingPlan": analysis["teachingPlan"],
        "createdAt": datetime.utcnow().isoformat() + "Z",
        "updatedAt": datetime.utcnow().isoformat() + "Z"
    }

    save_syllabus(new_syllabus)
    return {
        "message": "Syllabus processed and 6-session teaching plan created successfully",
        "syllabus": new_syllabus
    }

@app.delete("/api/syllabuses/{syllabus_id}")
def remove_syllabus(syllabus_id: str, user: dict = Depends(get_current_user)):
    if user["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Unauthorized: Only teachers can manage syllabuses")

    success = delete_syllabus(syllabus_id, user["id"])
    if not success:
        raise HTTPException(status_code=400, detail="Cannot delete this syllabus. You can only delete syllabuses you uploaded.")
    return {"message": "Syllabus deleted successfully"}

# ----------------- QUESTION PREDICTION -----------------

@app.get("/api/questions/history")
def question_history(user: dict = Depends(get_current_user)):
    history = get_requests_by_student(user["id"])
    return {"history": history}

@app.post("/api/questions/generate")
def generate_questions(
    req: QuestionGenerateRequest,
    user: dict = Depends(get_current_user)
):
    syllabus = get_syllabus_by_id(req.syllabusId)
    if not syllabus:
        raise HTTPException(status_code=404, detail="Selected syllabus could not be found.")

    prediction = generate_predicted_questions(
        syllabus=syllabus,
        selected_unit_ids=req.selectedUnits,
        selected_topic_ids=req.selectedTopics,
        marks=req.marks,
        question_type=req.questionType,
        difficulty=req.difficulty,
        question_count=req.questionCount,
        importance_filter=req.importanceFilter,
        university_name=req.universityName
    )

    if prediction.get("unsupportedNotice") and len(prediction["questions"]) == 0:
        raise HTTPException(
            status_code=422,
            detail=prediction["unsupportedNotice"]
        )

    record = {
        "id": f"req-{int(time.time() * 1000)}-{random_str()}",
        "studentId": user["id"],
        "syllabusId": syllabus["id"],
        "subjectName": syllabus["subjectName"],
        "selectedUnits": req.selectedUnits,
        "selectedTopics": req.selectedTopics,
        "marks": req.marks,
        "questionType": req.questionType,
        "difficulty": req.difficulty,
        "questionCount": req.questionCount,
        "importanceFilter": req.importanceFilter,
        "universityName": req.universityName,
        "isDemoGeneration": bool(syllabus.get("isDemo")),
        "questions": prediction["questions"],
        "createdAt": datetime.utcnow().isoformat() + "Z"
    }

    save_request(record)

    return {
        "message": "Questions predicted and validated successfully",
        "result": record
    }

def random_str(length=4):
    import string, random
    chars = string.ascii_lowercase + string.digits
    return "".join(random.choice(chars) for _ in range(length))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
