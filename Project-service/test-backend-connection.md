# คู่มือการตรวจสอบการเชื่อมต่อ Backend

## วิธีตรวจสอบว่า Backend ทำงานอยู่หรือไม่

### 1. ตรวจสอบว่า Backend ทำงานอยู่
เปิด Terminal/PowerShell และรันคำสั่ง:

```bash
# ตรวจสอบว่า port 3002 ถูกใช้งานอยู่
# Windows PowerShell:
netstat -ano | findstr :3002

# หรือทดสอบด้วย curl (ถ้ามี)
curl http://localhost:3002/tickets
```

ถ้า Backend ทำงานอยู่ คุณจะเห็น:
- `netstat` แสดงว่า port 3002 ถูกใช้งาน
- `curl` จะได้ response (อาจเป็น 401 Unauthorized ซึ่งหมายความว่า server ทำงานอยู่)

### 2. เริ่ม Backend Server

ถ้า Backend ยังไม่ทำงาน ให้รัน:

```bash
cd backend
npm run start:dev
```

คุณควรเห็นข้อความ: `Backend running on port 3002`

### 3. ตรวจสอบ Next.js Proxy

Next.js จะ proxy requests จาก `/api/*` ไปยัง `http://localhost:3002/*`

ตรวจสอบว่า `next.config.mjs` มีการตั้งค่าถูกต้อง:
```javascript
{
  source: '/api/:path*',
  destination: 'http://localhost:3002/:path*',
}
```

### 4. ตรวจสอบ Environment Variables

ตรวจสอบว่าไม่มีไฟล์ `.env.local` ที่ตั้งค่า `NEXT_PUBLIC_API_URL` เป็น URL โดยตรง
ควรใช้ `/api` เพื่อให้ Next.js proxy ทำงาน

### 5. Restart Next.js Dev Server

หลังจากแก้ไข `next.config.mjs` ต้อง restart Next.js:

```bash
# หยุด server (Ctrl+C)
# แล้วรันใหม่
cd Project-service
npm run dev
```

## สาเหตุที่พบบ่อย

1. **Backend ไม่ได้ทำงาน** - ต้องรัน `npm run start:dev` ในโฟลเดอร์ `backend`
2. **Port ถูกใช้งานแล้ว** - ตรวจสอบว่าไม่มีโปรแกรมอื่นใช้ port 3002
3. **Next.js ไม่ได้ restart** - หลังจากแก้ `next.config.mjs` ต้อง restart
4. **Database ไม่ได้เชื่อมต่อ** - Backend อาจไม่สามารถเชื่อมต่อ database ได้

## การ Debug

เปิด Browser Console และดู logs:
- `[ApiClient] Initialized with baseURL: /api` - แสดงว่าใช้ proxy
- `[ApiClient] Making request:` - แสดง URL ที่กำลังเรียก
- `[ApiClient] Request exception:` - แสดง error details
