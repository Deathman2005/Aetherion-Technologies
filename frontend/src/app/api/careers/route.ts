import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

// Lazy initialization of Firebase to handle hot-reloads safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse form parameters
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const role = formData.get("role") as string;
    const experience = formData.get("experience") as string;
    const portfolioUrl = formData.get("portfolioUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const skillsJson = formData.get("skills") as string;
    const whyJoin = formData.get("whyJoin") as string;
    const proudProject = formData.get("proudProject") as string;
    const resumeFile = formData.get("resume") as File;

    // Validate mandatory fields
    if (!fullName || !email || !role || !experience || !githubUrl || !whyJoin || !proudProject || !resumeFile) {
      return NextResponse.json(
        { success: false, message: "Required application fields or resume files are missing." },
        { status: 400 }
      );
    }

    // Process and validate resume file type and size
    const allowedExtensions = ["pdf", "docx"];
    const fileExtension = resumeFile.name.split(".").pop()?.toLowerCase();
    
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only PDF and DOCX resumes are accepted." },
        { status: 400 }
      );
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > maxFileSize) {
      return NextResponse.json(
        { success: false, message: "File exceeds 5MB size limit." },
        { status: 400 }
      );
    }

    // Stream and upload resume file directly to Firebase Storage
    let resumeUrl = "";
    try {
      console.log(`[Careers API] Preparing file upload for candidate: ${fullName} (${resumeFile.name})`);
      const arrayBuffer = await resumeFile.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);
      
      const uniqueFileName = `${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const storageRef = ref(storage, `resumes/${uniqueFileName}`);

      await uploadBytes(storageRef, fileBuffer, {
        contentType: resumeFile.type,
      });

      resumeUrl = await getDownloadURL(storageRef);
      console.log(`[Careers API] Resume uploaded successfully. Reference URL: ${resumeUrl}`);
    } catch (storageError: any) {
      console.warn("[Careers API Warning] Firebase Storage bucket not enabled or failed. Utilizing Firestore Base64 Ingestion Fallback...", storageError);
      
      // Firestore Base64 Ingestion Fallback
      const arrayBuffer = await resumeFile.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      
      // Limit check: Firestore documents are max 1MB. Safety cap at 900KB.
      if (fileBuffer.length > 900 * 1024) {
        return NextResponse.json(
          { 
            success: false, 
            message: "Firebase Storage bucket not initialized in your Console, and file exceeds 900KB Firestore fallback limits. Please enable Storage in Firebase Console or upload a smaller resume." 
          },
          { status: 400 }
        );
      }
      
      const base64Data = fileBuffer.toString("base64");
      resumeUrl = `data:${resumeFile.type};base64,${base64Data}`;
      console.log(`[Careers API] Resume converted successfully to Base64 (Length: ${resumeUrl.length} chars).`);
    }

    // Parse technical skills
    let skills: string[] = [];
    try {
      skills = JSON.parse(skillsJson || "[]");
    } catch (e) {
      skills = [];
    }

    // Record application details in Firestore under "applications" collection
    const docRef = await addDoc(collection(db, "applications"), {
      fullName,
      email,
      phone: phone || "",
      location: location || "",
      role,
      experience,
      portfolioUrl: portfolioUrl || "",
      githubUrl,
      linkedinUrl: linkedinUrl || "",
      skills,
      whyJoin,
      proudProject,
      resumeUrl,
      createdAt: new Date().toISOString(),
    });

    console.log(`[Careers API] Candidate application recorded successfully under ID: ${docRef.id}`);

    return NextResponse.json({
      success: true,
      message: "Application transmitted successfully. Thank you for applying!",
      id: docRef.id,
    });
  } catch (error: any) {
    console.error("[Careers API Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process application ingestion." },
      { status: 500 }
    );
  }
}
