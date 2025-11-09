# Hướng dẫn Deploy lên Vercel

## ⚠️ Lưu ý quan trọng về SQLite

**SQLite KHÔNG hoạt động tốt trên Vercel** vì:
- Vercel sử dụng serverless functions với filesystem read-only
- SQLite cần ghi file database, điều này không khả thi trên Vercel
- Database file sẽ bị mất sau mỗi lần deploy

## Giải pháp đề xuất

### Option 1: Sử dụng Vercel Postgres (Khuyến nghị)
1. Tạo Vercel Postgres database từ Vercel Dashboard
2. Cập nhật `DATABASE_URL` trong Vercel Environment Variables
3. Cập nhật `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

### Option 2: Sử dụng database service khác
- Supabase (PostgreSQL)
- PlanetScale (MySQL)
- MongoDB Atlas
- Railway, Render, etc.

## Các bước deploy

### 1. Cài đặt Vercel CLI (nếu chưa có)
```bash
npm i -g vercel
```

### 2. Login vào Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

Hoặc deploy production:
```bash
vercel --prod
```

### 4. Cấu hình Environment Variables

Trong Vercel Dashboard:
1. Vào Project Settings > Environment Variables
2. Thêm các biến:
   - `DATABASE_URL`: Connection string của database
   - `NODE_ENV`: `production`
   - `PORT`: (không cần thiết, Vercel tự động set)

### 5. Cấu hình Build Settings

Vercel sẽ tự động detect:
- **Build Command**: `npm run build`
- **Install Command**: `npm install && npm run prisma:generate`
- **Output Directory**: `dist` (không cần thiết vì dùng api/)

## Cấu trúc files

- `api/index.ts`: Entry point cho Vercel serverless function
- `vercel.json`: Cấu hình Vercel
- `src/index.ts`: Export Express app (không listen khi trên Vercel)

## Test local với Vercel

```bash
vercel dev
```

## Troubleshooting

1. **Lỗi Prisma Client không tìm thấy**: Đảm bảo `prisma:generate` chạy trong install command
2. **Lỗi database connection**: Kiểm tra `DATABASE_URL` trong Environment Variables
3. **Lỗi build**: Kiểm tra TypeScript compilation và đảm bảo tất cả dependencies được install

