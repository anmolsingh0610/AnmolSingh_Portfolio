import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Identification required"),
    email: z.string().email("Invalid relay address"),
    message: z.string().min(10, "Transmission too short"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = contactSchema.parse(body);

        // Simulate rate limiting and network propagation delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real application, you would integrate Resend or Nodemailer here
        // e.g., await resend.emails.send({ ... })

        return NextResponse.json(
            { success: true, message: "Transmission received and logged." },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, message: "Transmission failed. Interference detected." },
            { status: 500 }
        );
    }
}
