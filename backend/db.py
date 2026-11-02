import os
import json
import time
from datetime import datetime
from typing import List, Optional, Dict, Any
from passlib.context import CryptContext
from jose import jwt, JWTError

JWT_SECRET = os.getenv("JWT_SECRET", "ai-exam-predictor-production-secret-key-2026-secure")
ALGORITHM = "HS256"

import bcrypt

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(os.path.dirname(BACKEND_DIR), "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
SYLLABUSES_FILE = os.path.join(DATA_DIR, "syllabuses.json")
REQUESTS_FILE = os.path.join(DATA_DIR, "requests.json")

def ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)

def read_json(path: str, default: Any) -> Any:
    ensure_data_dir()
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(default, f, indent=2)
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return default

def write_json(path: str, data: Any):
    ensure_data_dir()
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        pwd_bytes = plain_password.encode('utf-8')[:72]
        hash_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(pwd_bytes, hash_bytes)
    except Exception:
        return False

def create_access_token(user_id: str, role: str, email: str) -> str:
    payload = {
        "userId": user_id,
        "role": role,
        "email": email,
        "exp": int(time.time()) + 7 * 24 * 3600
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# User Database Methods
def get_all_users() -> List[Dict[str, Any]]:
    return read_json(USERS_FILE, [])

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    users = get_all_users()
    for u in users:
        if u.get("email", "").lower() == email.lower():
            return u
    return None

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    users = get_all_users()
    for u in users:
        if u.get("id") == user_id:
            return u
    return None

def create_user(user_data: Dict[str, Any]) -> Dict[str, Any]:
    users = get_all_users()
    users.append(user_data)
    write_json(USERS_FILE, users)
    return user_data

# Syllabus Database Methods
def get_all_syllabuses() -> List[Dict[str, Any]]:
    return read_json(SYLLABUSES_FILE, [])

def get_syllabus_by_id(syllabus_id: str) -> Optional[Dict[str, Any]]:
    syllabuses = get_all_syllabuses()
    for s in syllabuses:
        if s.get("id") == syllabus_id:
            return s
    return None

def get_syllabuses_by_teacher(teacher_id: str) -> List[Dict[str, Any]]:
    syllabuses = get_all_syllabuses()
    return [s for s in syllabuses if s.get("userId") == teacher_id]

def get_published_syllabuses() -> List[Dict[str, Any]]:
    syllabuses = get_all_syllabuses()
    return [s for s in syllabuses if s.get("status") == "Completed" or s.get("isDemo") is True]

def save_syllabus(syllabus: Dict[str, Any]) -> Dict[str, Any]:
    syllabuses = get_all_syllabuses()
    for i, s in enumerate(syllabuses):
        if s.get("id") == syllabus.get("id"):
            syllabuses[i] = syllabus
            write_json(SYLLABUSES_FILE, syllabuses)
            return syllabus
    syllabuses.insert(0, syllabus)
    write_json(SYLLABUSES_FILE, syllabuses)
    return syllabus

def delete_syllabus(syllabus_id: str, teacher_id: str) -> bool:
    syllabuses = get_all_syllabuses()
    target = next((s for s in syllabuses if s.get("id") == syllabus_id), None)
    if not target:
        return False
    if target.get("isDemo"):
        return False
    if target.get("userId") != teacher_id:
        return False
    
    updated = [s for s in syllabuses if s.get("id") != syllabus_id]
    write_json(SYLLABUSES_FILE, updated)
    return True

# Requests Database Methods
def get_all_requests() -> List[Dict[str, Any]]:
    return read_json(REQUESTS_FILE, [])

def get_requests_by_student(student_id: str) -> List[Dict[str, Any]]:
    requests = get_all_requests()
    return [r for r in requests if r.get("studentId") == student_id]

def save_request(record: Dict[str, Any]) -> Dict[str, Any]:
    records = get_all_requests()
    for i, r in enumerate(records):
        if r.get("id") == record.get("id"):
            records[i] = record
            write_json(REQUESTS_FILE, records)
            return record
    records.insert(0, record)
    write_json(REQUESTS_FILE, records)
    return record
