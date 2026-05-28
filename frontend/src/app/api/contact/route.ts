import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Secure Firebase configuration loaded entirely from server-side env
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Lazy initialization of Firebase to prevent hot-reload app duplication
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, companySize, service, message } = body;

    // Check for required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing: Name, Email, Service, and Scope." },
        { status: 400 }
      );
    }

    // Add document to "contacts" collection
    const docRef = await addDoc(collection(db, "contacts"), {
      name,
      email,
      company: company || "",
      companySize: companySize || "",
      service,
      message,
      createdAt: new Date().toISOString(),
    });

    console.log(`[Firebase] Securely recorded contact entry under ID: ${docRef.id}`);

    return NextResponse.json({
      success: true,
      message: "Consultation request securely recorded.",
      id: docRef.id,
    });
  } catch (error: any) {
    console.error("[Firebase API Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit request." },
      { status: 500 }
    );
  }
}
