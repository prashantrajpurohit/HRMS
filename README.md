# HRMS Lite

Simple HRMS app built with Next.js + MongoDB.

## Features
- Dashboard counts (Total Employees, Present Today, Absent Today)
- Employee management: add, edit, delete
- Attendance marking + attendance history
- Filtering on Employees and Attendance pages
- Light/Dark theme switch

## Tech
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + shadcn-style UI
- MongoDB + Mongoose

## Quick Start
1. Install deps:
```bash
npm install
```

2. Create `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
# optional fallback key supported by app:
# MONGO_URI=your_mongodb_connection_string

# optional for cross-origin API usage:
# CORS_ORIGINS=http://localhost:5008,https://your-frontend-domain.com
```

3. Run app:
```bash
npm run dev
```

Default local URL: `http://localhost:5008`

## Build
```bash
npm run build
npm run start
```

## App Routes
- `/` dashboard
- `/employees` employees page
- `/attendance` attendance page

## API Routes
- `GET /api/dashboard`
- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/[id]` update employee
  - If `employeeId` changes, linked attendance records are updated too
- `DELETE /api/employees/[id]`
  - Also removes attendance records for that employee
- `GET /api/attendance`
- `POST /api/attendance`
- `GET /api/attendance/[employeeId]`

## Main Components
- `app/layout.tsx`: global layout + theme providers + top nav
- `components/hrms-top-nav.tsx`: nav links + active state + theme toggle
- `components/theme-toggle.tsx`: light/dark switch
- `components/DashboardCards.tsx`: dashboard metrics cards
- `components/AddEmployeeForm.tsx`: add employee modal form
- `components/EditEmployeeForm.tsx`: edit employee modal form
- `components/EmployeeTable.tsx`: employees table + edit/delete actions
- `components/MarkAttendanceForm.tsx`: mark attendance modal form
- `components/AttendanceTable.tsx`: attendance table + present summary
- `components/table-filter-bar.tsx`: shared filter UI wrapper

## Folder Overview
```txt
app/
  api/
    attendance/
    dashboard/
    employees/
  attendance/
  employees/
  layout.tsx
  page.tsx

components/
  AddEmployeeForm.tsx
  EditEmployeeForm.tsx
  EmployeeTable.tsx
  MarkAttendanceForm.tsx
  AttendanceTable.tsx
  DashboardCards.tsx
  hrms-top-nav.tsx
  theme-toggle.tsx
  table-filter-bar.tsx

lib/
  mongodb.ts

models/
  Employee.ts
  Attendance.ts
```

## Troubleshooting
- `Please define MONGODB_URI...`
  - Set `MONGODB_URI` (or `MONGO_URI`) and restart server.

- Vercel API `500`
  - Verify env vars in Vercel project settings.
  - Verify MongoDB user/password and network access.

- CORS error
  - Set `CORS_ORIGINS` as comma-separated allowed origins.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
