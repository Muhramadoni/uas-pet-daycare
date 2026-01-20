turso database url: libsql://petdaycare-muhramadoni.aws-ap-northeast-1.turso.io
turso token: eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg4MjM3MjcsImlkIjoiOTQzZTcwZWEtMDdjOS00OTBjLTk5YzgtMGM0OTI2YjczZDI1IiwicmlkIjoiZmYwMWRjMDUtN2Y3MC00MzA0LWEwZmEtOWU2OGY3NzA2YjVkIn0.gampL0N8F_WCptcvYTeGlHAtWLdSiGYTThSe_ccMGNIyNu44q3YOxjgqIo1AtOHsbDajadiHUvGN17QS-cF8Cg

url backend:https://uas-pet-daycare-o1q8.vercel.app/
url frontend:https://uas-pet-daycare-rwie.vercel.app/

#==================================
Setup Project & Running Backend
#==================================

1. Init Project:
   cd backend
   npm init -y

2. Install Dependencies:
   npm install express cors sequelize mysql2 jsonwebtoken dotenv bcryptjs
   npm install nodemon --save-dev

3. Running Project:
   node server.js

#==================================
Setup Project & Running Frontend
#==================================

1. Buat Project React + Vite:
   npm create vite@latest frontend
   cd frontend
   npm install

2. Install Tailwindcss 3.4.17:
   npm install -D tailwindcss@3.4.17 postcss autoprefixer
   npx tailwindcss init -p

3. Install Axios:
   npm install axios

4. Running Project:
   npm run dev

#==================================
Testing Api
#==================================

URL: http://localhost:5000/api/users

1. Persiapan: Register User Baru
   Method: POST
   URL: http://localhost:5000/api/auth/register
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
   "name": "Admin User",
   "email": "admin@example.com",
   "password": "password123"
   }
   Expected Response: 200 OK dengan data user (tanpa password).
   Catatan: Lakukan sekali untuk membuat user pertama.

2. Login untuk Mendapat Token
   Method: POST
   URL: http://localhost:5000/api/auth/login
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
   "email": "admin@example.com",
   "password": "password123"
   }
   Expected Response: 200 OK dengan { "token": "jwt_token_here" }.
   Catatan: Simpan token ini. Gunakan di header untuk request selanjutnya.

3. Manajemen Pemilik (Pemilik Hewan)
   Headers untuk semua request di bawah: Authorization: Bearer <token_dari_login>
   GET /api/pemilik (List semua pemilik)
   Method: GET
   URL: http://localhost:5000/api/pemilik
   Expected: 200 OK, array pemilik dengan hewan mereka.
   GET /api/pemilik/:id (Detail pemilik by ID)

   Method: GET
   URL: http://localhost:5000/api/pemilik/1 (ganti 1 dengan ID yang ada)
   Expected: 200 OK atau 404 jika tidak ada.

   POST /api/pemilik (Tambah pemilik baru)
   Method: POST
   Headers: Content-Type: application/json
   Body:
   {
   "nama_pemilik": "John Doe",
   "alamat": "Jl. Contoh No. 123",
   "no_telepon": "08123456789"
   }
   Expected: 200 OK dengan data pemilik baru.
   PUT /api/pemilik/:id (Update pemilik)

   Method: PUT
   URL: http://localhost:5000/api/pemilik/1 (ganti ID)
   Headers: Content-Type: application/json
   Body:
   {
   "nama_pemilik": "Jane Doe",
   "alamat": "Jl. Baru No. 456",
   "no_telepon": "08198765432"
   }
   Expected: 200 OK dengan data terupdate.

   DELETE /api/pemilik/:id (Hapus pemilik)
   Method: DELETE
   URL: http://localhost:5000/api/pemilik/1 (ganti ID)
   Expected: 200 OK dengan { "message": "Deleted" }.

4. Manajemen Hewan
   Headers: Authorization: Bearer <token>
   GET /api/hewan (List semua hewan)
   Method: GET
   URL: http://localhost:5000/api/hewan
   Expected: 200 OK, array hewan dengan pemilik.
   GET /api/hewan/:id (Detail hewan by ID)

   Method: GET
   URL: http://localhost:5000/api/hewan/1
   Expected: 200 OK atau 404.
   POST /api/hewan (Tambah hewan baru)

   Method: POST
   Headers: Content-Type: application/json
   Body:
   {
   "nama_hewan": "Buddy",
   "jenis_hewan": "Anjing",
   "pemilik_id": 1 // ID pemilik yang sudah ada
   }
   Expected: 200 OK dengan data hewan baru.
   PUT /api/hewan/:id (Update hewan)

   Method: PUT
   URL: http://localhost:5000/api/hewan/1
   Headers: Content-Type: application/json
   Body:
   {
   "nama_hewan": "Max",
   "jenis_hewan": "Kucing",
   "pemilik_id": 1
   }
   Expected: 200 OK.
   DELETE /api/hewan/:id (Hapus hewan)

   Method: DELETE
   URL: http://localhost:5000/api/hewan/1
   Expected: 200 OK.

5. Manajemen Users
   Headers: Authorization: Bearer <token>
   GET /api/users (List semua users)
   Method: GET
   URL: http://localhost:5000/api/users
   Expected: 200 OK, array users (tanpa password).
   GET /api/users/:id (Detail user by ID)

   Method: GET
   URL: http://localhost:5000/api/users/1
   Expected: 200 OK.
   POST /api/users (Tambah user baru)

   Method: POST
   Headers: Content-Type: application/json
   Body:
   {
   "name": "Staff User",
   "email": "staff@example.com",
   "password": "password456"
   }
   Expected: 200 OK (password akan di-hash otomatis).
   PUT /api/users/:id (Update user)

   Method: PUT
   URL: http://localhost:5000/api/users/2
   Headers: Content-Type: application/json
   Body:
   {
   "name": "Updated Staff",
   "email": "staff2@example.com",
   "password": "newpassword"
   }
   Expected: 200 OK.
   DELETE /api/users/:id (Hapus user)

   Method: DELETE
   URL: http://localhost:5000/api/users/2
   Expected: 200 OK.
