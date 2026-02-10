from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import sqlite3
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv


app = FastAPI()
load_dotenv()  


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_NAME = "contact.db"


def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


init_db()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

def send_email(req: ContactRequest):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    mail_to = os.getenv("MAIL_TO")
    mail_from = os.getenv("MAIL_FROM")

    # Hard fail if env vars missing (so you see the real issue)
    missing = [k for k, v in {
        "SMTP_HOST": smtp_host,
        "SMTP_USER": smtp_user,
        "SMTP_PASS": smtp_pass,
        "MAIL_TO": mail_to,
        "MAIL_FROM": mail_from,
    }.items() if not v]
    if missing:
        raise RuntimeError(f"Missing env vars: {', '.join(missing)}")

    msg = EmailMessage()
    msg["Subject"] = f"New Portfolio Message from {req.name}"
    msg["From"] = mail_from
    msg["To"] = mail_to
    msg["Reply-To"] = req.email  
    msg.set_content(
        f"Name: {req.name}\nEmail: {req.email}\n\nMessage:\n{req.message}\n"
    )

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.set_debuglevel(1)   # <-- ADD THIS LINE (TEMP)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        result = server.send_message(msg)
        print("SMTP send_message result:", result)



@app.post("/contact")
def submit_contact(req: ContactRequest):
    try:
        # 1) Save to SQLite
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
            (req.name, req.email, req.message),
        )
        conn.commit()
        conn.close()

        # 2) Send email
        send_email(req)

        return {"status": "success"}

    except Exception as e:
        print("CONTACT ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/health")
def health():
    return {"status": "ok"}
