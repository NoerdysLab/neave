# Neave

Pre-launch waitlist landing page for Neave. Single-page Next.js 15 site that captures emails into Klaviyo.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Klaviyo profile-subscription-bulk-create-jobs API
- Deploys to Vercel

## Local dev

```bash
cp .env.example .env.local
# fill in KLAVIYO_PRIVATE_KEY and KLAVIYO_LIST_ID
npm install
npm run dev
```

Open http://localhost:3000.

## Env vars

| Name | Description |
| --- | --- |
| `KLAVIYO_PRIVATE_KEY` | Private API key, scoped to `lists:write profiles:write subscriptions:write`. |
| `KLAVIYO_LIST_ID` | The Klaviyo list ID to subscribe new emails to. |

## Deploy

Push to a Vercel project and add the two env vars in the project settings.
