<div align="center">

# 🎓 MentorLagbe

**Find the right tutor, manage tuition listings, and connect students with teachers.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Latest-10B981?style=for-the-badge)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## 📖 What is MentorLagbe?

MentorLagbe is a tuition marketplace that helps students discover tutors and tuition batches while giving tutors tools to publish listings, manage applications, and grow their profile.

The platform supports role-based dashboards for **students, tutors, and administrators**, plus authentication, tuition filtering, saved listings, applications, profile management, and Stripe checkout for premium plans.

---

## Key Features

### 1. 🔍 Tuition Discovery

Browse tuition listings with search and filters for subject, class level, location, and teaching mode. Open individual listings to view schedule, fee, tutor information, and full descriptions.

### 2. 🎓 Student Features

Students can save tuition listings, apply with their preferred schedule, track application statuses, cancel pending applications, and manage their profile.

### 3. 🧑‍🏫 Tutor Features

Tutors can post tuition batches, upload banners, edit or delete listings, activate or deactivate posts, review applicants, and accept or reject applications.

### 4. 🛡️ Admin Dashboard

Administrators can review platform statistics, manage users and roles, moderate tuition approvals, and view transaction records.

### 5. 💳 Plans and Payments

The pricing experience includes starter and PRO plans. Signed-in users can begin Stripe checkout and see payment success or cancellation states.

### 6. 🔐 Secure Authentication

Email/password authentication and Google sign-in are powered by Better Auth. Sessions use JWT-backed cookies and role information is stored for student, tutor, and admin access control.

### 7. 🌙 Responsive Dashboard Experience

The application includes responsive navigation, mobile sidebars, skeleton loading states, dark/light theme support, toast notifications, and role-specific dashboard layouts.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | Full-stack React framework with App Router |
| [React 19](https://react.dev/) | Component-based UI development |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe application code |
| [Tailwind CSS v4](https://tailwindcss.com/) | Responsive utility-first styling |
| [Shadcn UI](https://ui.shadcn.com/) | Accessible, composable interface components |
| [Better Auth](https://better-auth.com/) | Authentication and JWT session handling |
| [MongoDB](https://www.mongodb.com/) | User and application data storage |
| [Express.js](https://expressjs.com/) | REST API backend for application services |
| [Stripe](https://stripe.com/) | Premium plan checkout and payment status |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- MongoDB connection string
- A running MentorLagbe backend/API
- Google OAuth credentials for Google sign-in, if used
- Stripe configuration for payment flows

### Installation

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Run the production server
npm run lint   # Run ESLint
```

---

## 📁 Project Structure

```text
.
├── AGENTS.md                    # Repository guidance and working instructions
├── README.md                    # Project documentation
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Scripts and dependencies
├── package-lock.json            # npm lockfile
├── tsconfig.json                # TypeScript configuration
├── public/                      # Logos, banners, and static assets
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Sign-in and sign-up pages
│   │   ├── (dashboard)/         # Role-based dashboard routes
│   │   │   └── dashboard/
│   │   │       ├── admin/
│   │   │       ├── profile/
│   │   │       ├── student/
│   │   │       └── tutor/
│   │   ├── (site)/              # Public pages and payment routes
│   │   │   ├── tuitions/
│   │   │   ├── pricing/
│   │   │   └── payment/
│   │   ├── api/auth/            # Better Auth route handler
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── auth/                # Authentication forms
│   │   ├── dashboard/           # Admin, student, tutor, and profile UI
│   │   ├── home/                # Landing-page sections
│   │   ├── layout/              # Header and footer
│   │   ├── payment/             # Checkout status UI
│   │   ├── pricing/             # Pricing plans
│   │   ├── tuitions/            # Listing browse and details UI
│   │   └── ui/                  # Shared Shadcn-style components
│   ├── hooks/                   # Mobile, subscription, and client hooks
│   ├── lib/
│   │   ├── actions/             # API and server/client mutations
│   │   ├── core/                # Session helpers
│   │   ├── data/                # Seeded and local fallback data
│   │   └── types/               # Shared TypeScript types
│   └── proxy.ts                 # Dashboard route protection
└── .gitignore
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📌 License

This project is open source and available under the MIT License.
