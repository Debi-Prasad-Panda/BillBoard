import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Processes contact form submissions.
 * Currently stores in-memory and logs — wire up to email service / DB in production.
 */

type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  type: "advertiser" | "vendor" | "agency" | "support";
  message: string;
};

// In-memory store for MVP — replace with database in production
const submissions: (ContactSubmission & { id: string; createdAt: string })[] = [];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message } = body as ContactSubmission;

    // Validation
    const errors: string[] = [];
    if (!name?.trim()) errors.push("Name is required");
    if (!email?.trim() || !validateEmail(email)) errors.push("Valid email is required");
    if (!type) errors.push("Inquiry type is required");
    if (!message?.trim()) errors.push("Message is required");
    if (message?.trim().length < 10) errors.push("Message must be at least 10 characters");

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Create submission record
    const submission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      type,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    submissions.push(submission);

    console.log("[Contact Form]", JSON.stringify(submission, null, 2));

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: "Thank you! We'll respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, errors: ["Failed to process your submission. Please try again."] },
      { status: 500 }
    );
  }
}

// GET — retrieve submissions (admin use, would be auth-gated in production)
export async function GET() {
  return NextResponse.json({
    total: submissions.length,
    submissions: submissions.slice(-50).reverse(),
  });
}
