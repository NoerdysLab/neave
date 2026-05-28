import { NextResponse } from "next/server";

const KLAVIYO_REVISION = "2026-04-15";
const KLAVIYO_ENDPOINT =
  "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SubscribeBody {
  email?: string;
  source?: string;
}

interface KlaviyoErrorDetail {
  detail?: string;
  code?: string;
  source?: { pointer?: string };
}

export async function POST(req: Request) {
  const apiKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    console.error(
      "Missing KLAVIYO_PRIVATE_KEY or KLAVIYO_LIST_ID env variable",
    );
    return NextResponse.json(
      { error: "Server is not configured. Please try again later." },
      { status: 500 },
    );
  }

  let body: SubscribeBody;
  try {
    body = (await req.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "landing").slice(0, 64);

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const payload = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: {
                      consent: "SUBSCRIBED",
                    },
                  },
                },
              },
            },
          ],
        },
        custom_source: `Neave waitlist (${source})`,
      },
      relationships: {
        list: {
          data: {
            type: "list",
            id: listId,
          },
        },
      },
    },
  };

  let klaviyoRes: Response;
  try {
    klaviyoRes = await fetch(KLAVIYO_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        accept: "application/json",
        "content-type": "application/json",
        revision: KLAVIYO_REVISION,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Klaviyo network error", err);
    return NextResponse.json(
      { error: "Network error. Please try again." },
      { status: 502 },
    );
  }

  if (klaviyoRes.status === 202 || klaviyoRes.status === 204 || klaviyoRes.ok) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const raw = await klaviyoRes.text();
  let parsed: { errors?: KlaviyoErrorDetail[] } | null = null;
  try {
    parsed = JSON.parse(raw) as { errors?: KlaviyoErrorDetail[] };
  } catch {
    parsed = null;
  }

  const firstError = parsed?.errors?.[0];
  const detail = (firstError?.detail ?? "").toLowerCase();

  if (
    klaviyoRes.status === 400 &&
    detail.includes("email") &&
    (detail.includes("invalid") || detail.includes("not a valid"))
  ) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  if (klaviyoRes.status === 409 || detail.includes("already")) {
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  if (klaviyoRes.status === 429) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  console.error(
    `Klaviyo subscribe failed: ${klaviyoRes.status} ${raw.slice(0, 500)}`,
  );

  return NextResponse.json(
    { error: "Could not add you to the list. Please try again later." },
    { status: 502 },
  );
}
