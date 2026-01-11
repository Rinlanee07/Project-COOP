# การแก้ไขปัญหา Authentication

## ปัญหาที่พบ
- ล็อกอินหรือสมัครได้ แต่เมื่อเข้าสู่หน้า dashboard มันเด้งออกมายังหน้าล็อกอิน

## สาเหตุ
1. LoginForm และ RegisterForm ใช้ direct API call แทน NextAuth
2. Dashboard ตรวจสอบ session แต่ไม่มี session เพราะไม่ได้ใช้ NextAuth
3. ไม่มี API route สำหรับ NextAuth

## การแก้ไขที่ทำ

### 1. แก้ไข LoginForm
- เปลี่ยนจาก direct API call เป็นใช้ `signIn` จาก NextAuth
- ใช้ `window.location.href` สำหรับ redirect

### 2. แก้ไข RegisterForm  
- ใช้ direct API call สำหรับ registration
- หลังจากสมัครสำเร็จ ให้ล็อกอินอัตโนมัติ
- เก็บ token ชั่วคราวใน localStorage

### 3. แก้ไข Dashboard Page
- เปลี่ยนจาก Server Component เป็น Client Component
- ใช้ `useSession` จาก NextAuth
- จัดการ loading state และ redirect

### 4. แก้ไข Middleware
- ตรวจสอบ user session ก่อนเข้า dashboard
- Redirect ไปหน้า login ถ้าไม่มี session

### 5. สร้าง NextAuth API Route
- สร้าง `/api/auth/[...nextauth]/route.ts`
- ใช้ authOptions ที่แก้ไขแล้ว

### 6. แก้ไข auth.ts
- ใช้ direct fetch แทน apiClient
- ตั้งค่า pages.signIn เป็น "/"

## Environment Variables ที่ต้องตั้งค่า

สร้างไฟล์ `.env.local` ใน Project-service:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## การทดสอบ

1. เริ่ม Backend: `cd backend && npm run start:dev`
2. เริ่ม Frontend: `cd Project-service && npm run dev`
3. ทดสอบล็อกอินที่ http://localhost:3000
4. ตรวจสอบว่าเข้าสู่ dashboard ได้

## หมายเหตุ

- ระบบจะใช้ NextAuth สำหรับ session management
- Backend API จะใช้ JWT tokens
- Frontend จะไม่เข้าถึง database โดยตรง
