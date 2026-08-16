# 🛠️ James Dev & Tester Portal

> Modern Personal Portfolio & Internal QA/Dev Build Distribution Portal built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **MDX Documentation**, and **Supabase / PostgreSQL with Drizzle ORM**.

---

## 🌟 Key Features

1. **Personal Landing Page (`/`)**:
   - High-contrast, dark-mode focused UI highlighting Android and Full-Stack engineering proficiencies.
   - Live latest-build status widget linked directly to staging binaries.
   - Featured projects and technical competencies breakdown.

2. **Releases & Tester Build Hub (`/releases`)**:
   - Filterable builds by environment (**Staging**, **UAT**, **Prod**).
   - Instant APK direct download links and **instant QR Code generator** to install directly on mobile devices without USB transfers.
   - Detailed changelogs, build version codes, file sizes, and minimum Android OS level tags.
   - Built-in **Tester Feedback Modal** to log bug reports and device OS details directly to the database.

3. **Dev & Tester Documentation Hub (`/docs`)**:
   - Fast Markdown/MDX documentation engine with syntax highlighting.
   - Guides included:
     - `Getting Started`: Environment setup, JDK, Node, and Gradle build instructions.
     - `Testing Guide`: ADB logcat capture workflows and QA test matrix.

4. **Drizzle ORM & Database Architecture**:
   - Type-safe Postgres schema (`releases`, `tester_feedbacks`).
   - Server Actions for zero-client-bundle database queries with automatic local fallback support.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd dev-portal
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase PostgreSQL connection string:
```env
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```
*(Note: If `DATABASE_URL` is not provided, the portal runs seamlessly in local preview mode using built-in mock build releases).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 4. Database Migrations (Drizzle ORM)
```bash
# Push schema updates directly to database
npx drizzle-kit push
```

---

## 📂 Project Structure

```text
dev-portal/
├── src/
│   ├── actions/                   # Server Actions (releases, feedback)
│   │   ├── releases.ts
│   │   └── feedback.ts
│   ├── app/
│   │   ├── docs/
│   │   │   └── [[...slug]]/       # Dynamic MDX Documentation Viewer
│   │   │       └── page.tsx
│   │   ├── releases/              # QA / Tester Build Distribution Dashboard
│   │   │   └── page.tsx
│   │   ├── layout.tsx             # Root layout with Dark Mode theme
│   │   └── page.tsx               # Personal Landing Page
│   ├── components/                # Modular UI Components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ReleaseDashboardClient.tsx
│   │   ├── FeedbackModal.tsx
│   │   ├── DocsSidebar.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── content/                   # MDX Documentation Files
│   │   ├── docs/
│   │   │   ├── index.mdx
│   │   │   ├── getting-started.mdx
│   │   │   └── testing-guide.mdx
│   ├── db/                        # Drizzle ORM Schema & Client
│   │   ├── index.ts
│   │   └── schema.ts
│   └── lib/                       # Utilities & Docs parser
│       ├── docs.ts
│       └── utils.ts
├── drizzle.config.ts              # Drizzle Kit Configuration
├── .env.example
└── package.json
```
