import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { NextResponse } from "next/server";

// Secure Firebase configuration loaded from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Lazy initialization of Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function GET(request: Request) {
  try {
    // Extract and verify secure custom PIN header
    const authHeader = request.headers.get("x-admin-pin");
    const securePin = process.env.ADMIN_ACCESS_PIN || "2026";

    if (!authHeader || authHeader !== securePin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Insufficient privileges." },
        { status: 401 }
      );
    }

    // Retrieve documents sorted chronologically
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const submissions = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        companySize: data.companySize || "",
        service: data.service || "",
        message: data.message || "",
        createdAt: data.createdAt || new Date().toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      data: submissions,
    });
  } catch (error: any) {
    console.error("[Analytics API Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve analytics data." },
      { status: 500 }
    );
  }
}
