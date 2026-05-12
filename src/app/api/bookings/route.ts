import { NextResponse } from "next/server";

/**
 * POST /api/bookings
 *
 * Creates a booking inquiry / concierge request for a billboard.
 * This is the MVP "Book Now" flow — captures intent and notifies the team.
 *
 * In production: integrates with payment gateway (Razorpay), creates escrow,
 * and triggers vendor notification.
 */

type BookingInquiry = {
  billboardId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  startDate: string;
  duration: number;       // days
  budget?: number;
  requirements?: string;
};

// In-memory store for MVP
const bookings: (BookingInquiry & {
  id: string;
  status: "pending" | "confirmed" | "in_review";
  createdAt: string;
  estimatedTotal: number;
})[] = [];

// Billboard prices for estimation
const BILLBOARD_PRICES: Record<string, number> = {
  "bb-1": 4500, "bb-2": 7200, "bb-3": 3200, "bb-4": 8500,
  "bb-5": 2800, "bb-6": 5600, "bb-7": 6800, "bb-8": 3800,
  "bb-9": 5200, "bb-10": 6200, "bb-11": 4800, "bb-12": 3500,
  "bb-13": 7500, "bb-14": 9500,
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[\d+\-\s()]{8,15}$/.test(phone);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { billboardId, name, email, phone, company, startDate, duration, budget, requirements } = body as BookingInquiry;

    // Validation
    const errors: string[] = [];
    if (!billboardId) errors.push("Billboard ID is required");
    if (!name?.trim()) errors.push("Name is required");
    if (!email?.trim() || !validateEmail(email)) errors.push("Valid email is required");
    if (!phone?.trim() || !validatePhone(phone)) errors.push("Valid phone number is required");
    if (!startDate) errors.push("Start date is required");
    if (!duration || duration < 1 || duration > 365) errors.push("Duration must be 1-365 days");

    // Check date is in the future
    if (startDate && new Date(startDate) < new Date()) {
      errors.push("Start date must be in the future");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Calculate estimated total
    const pricePerDay = BILLBOARD_PRICES[billboardId] || 5000;
    const estimatedTotal = pricePerDay * duration;

    // Create booking record
    const booking = {
      id: `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      billboardId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company?.trim() || "",
      startDate,
      duration,
      budget: budget || estimatedTotal,
      requirements: requirements?.trim() || "",
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      estimatedTotal,
    };

    bookings.push(booking);

    console.log("[Booking Inquiry]", JSON.stringify(booking, null, 2));

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
        estimatedTotal: booking.estimatedTotal,
        pricePerDay,
        message: `Your booking inquiry ${booking.id} has been received. Our concierge team will contact you within 2 hours to confirm availability and process your booking.`,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, errors: ["Failed to process booking. Please try again."] },
      { status: 500 }
    );
  }
}

// GET — retrieve bookings by email (customer-facing) or all (admin)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.toLowerCase();

  if (email) {
    const userBookings = bookings.filter(b => b.email === email);
    return NextResponse.json({
      total: userBookings.length,
      bookings: userBookings.reverse(),
    });
  }

  // Admin view — would be auth-gated in production
  return NextResponse.json({
    total: bookings.length,
    bookings: bookings.slice(-50).reverse(),
  });
}
