# Personal CV

A single-page portfolio with smooth section-based navigation, built with [Next.js](https://nextjs.org/).

## ✦ Overview

A sleek one-page portfolio that tells your story — from intro to contact — without ever leaving the page. Each section is independently routed, so deep-linking always works.

## ✦ Features

- **Single-page experience** — all sections flow seamlessly on one canvas
- **Section routing** — each section has its own URL for direct linking
- **Contact form** — powered by [EmailJS](https://www.emailjs.com/), no backend required
- **Fully responsive** — looks sharp on every screen size
- **Fast & lightweight** — built on Next.js for optimal performance and SEO

## ✦ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | [Next.js](https://nextjs.org/)      |
| Email API  | [EmailJS](https://www.emailjs.com/) |
| Deployment | [Vercel](https://vercel.com/)       |

---

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## ✦ Email Setup

This project uses **EmailJS** to handle contact form submissions — no server needed.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Set up a service and email template
3. Add your credentials to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## ✦ Deployment

The easiest way to deploy is with **[Vercel](https://vercel.com/)** — the platform built for Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your repo to GitHub
2. Import it on Vercel
3. Add your environment variables
4. Deploy — done ✓

_Built with Next.js · Deployed on Vercel_
