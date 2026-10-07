import { validateEnquiry, type Enquiry } from "../../lib/enquiry";

export async function POST(request: Request) {
  let body: Partial<Enquiry>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  // TODO: deliver the enquiry (email service, CRM, database…). Until then it
  // is only written to the server log.
  console.log("[contact] new enquiry", {
    name: body.name?.trim(),
    phone: body.phone,
    email: body.email || undefined,
    interest: body.interest,
    budget: body.budget,
    message: body.message?.trim() || undefined,
  });

  return Response.json({ ok: true });
}
