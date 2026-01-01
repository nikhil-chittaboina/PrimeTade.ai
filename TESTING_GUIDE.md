# Testing Guide - PrimeTrade.ai Assignment

This document provides comprehensive instructions for testing the Task Management API.

---

## Table of Contents

1. [Pre-requisites](#pre-requisites)
2. [Manual Testing Workflow](#manual-testing-workflow)
3. [Testing with Postman](#testing-with-postman)
4. [Testing with cURL](#testing-with-curl)
5. [Frontend Testing](#frontend-testing)
6. [Common Test Scenarios](#common-test-scenarios)
7. [Troubleshooting](#troubleshooting)

---

## Pre-requisites

Before testing, ensure:

- ✅ MongoDB is running (local or Atlas)
- ✅ Backend server is running on `http://localhost:5000`
- ✅ Frontend is running on `http://localhost:5173` (for UI testing)
- ✅ `.env` file is configured with valid credentials
- ✅ All dependencies are installed (`npm install`)

---

## Manual Testing Workflow

### Step 1: Test User Registration

**Expected Behavior:** New users can register successfully

**Test Cases:**

1. **Valid Registration (User Role)**
   ```json
   POST /api/v1/auth/register
   {
     "username": "test_user",
     "email": "test@example.com",
     "password": "Test123456",
     "role": "user"
   }
   ```
   ✅ Expected: 201 Created, returns user data and JWT token

2. **Valid Registration (Admin Role)**
   ```json
   POST /api/v1/auth/register
   {
     "username": "admin_user",
     "email": "admin@example.com",
     "password": "Admin123456",
     "role": "admin"
   }
   ```
   ✅ Expected: 201 Created, returns admin user data and token

3. **Duplicate Email**
   - Register same email twice
   - ✅ Expected: 400 Bad Request, "User already exists"

4. **Missing Required Fields**
   ```json
   POST /api/v1/auth/register
   {
     "email": "test@example.com"
   }
   ```
   ✅ Expected: 400 Bad Request, validation error

5. **Invalid Email Format**
   ```json
   POST /api/v1/auth/register
   {
     "username": "test",
     "email": "invalid-email",
     "password": "Test123"
   }
   ```
   ✅ Expected: 400 Bad Request, "Invalid email format"

6. **Weak Password**
   ```json
   POST /api/v1/auth/register
   {
     "username": "test",
     "email": "test@example.com",
     "password": "123"
   }
   ```
   ✅ Expected: 400 Bad Request, "Password too short"

---

### Step 2: Test User Login

**Expected Behavior:** Users can login with valid credentials

**Test Cases:**

1. **Valid Login**
   ```json
   POST /api/v1/auth/login
   {
     "email": "test@example.com",
     "password": "Test123456"
   }
   ```
   ✅ Expected: 200 OK, returns user data and JWT token

2. **Invalid Password**
   ```json
   POST /api/v1/auth/login
   {
     "email": "test@example.com",
     "password": "WrongPassword"
   }
   ```
   ✅ Expected: 401 Unauthorized

3. **Non-existent User**
   ```json
   POST /api/v1/auth/login
   {
     "email": "nonexistent@example.com",
     "password": "Test123"
   }
   ```
   ✅ Expected: 401 Unauthorized

4. **Missing Credentials**
   ```json
   POST /api/v1/auth/login
   {
     "email": "test@example.com"
   }
   ```
   ✅ Expected: 400 Bad Request

---

### Step 3: Test Task Creation

**Expected Behavior:** Authenticated users can create tasks

**Test Cases:**

1. **Valid Task Creation**
   ```json
   POST /api/v1/tasks
   Headers: Authorization: Bearer <token>
   {
     "title": "Test Task 1",
     "description": "This is a test task",
     "status": "pending"
   }
   ```
   ✅ Expected: 201 Created, returns task data

2. **Task Without Authentication**
   ```json
   POST /api/v1/tasks
   {
     "title": "Test Task",
     "description": "Description"
   }
   ```
   ✅ Expected: 401 Unauthorized

3. **Task Without Title**
   ```json
   POST /api/v1/tasks
   Headers: Authorization: Bearer <token>
   {
     "description": "Description only"
   }
   ```
   ✅ Expected: 400 Bad Request

4. **Task With Invalid Status**
   ```json
   POST /api/v1/tasks
   Headers: Authorization: Bearer <token>
   {
     "title": "Test Task",
     "status": "invalid_status"
   }
   ```
   ✅ Expected: 400 Bad Request

---

### Step 4: Test Get All Tasks

**Expected Behavior:** Users can retrieve their own tasks

**Test Cases:**

1. **Get Tasks (Authenticated)**
   ```
   GET /api/v1/tasks
   Headers: Authorization: Bearer <token>
   ```
   ✅ Expected: 200 OK, returns array of tasks

2. **Get Tasks (Unauthenticated)**
   ```
   GET /api/v1/tasks
   ```
   ✅ Expected: 401 Unauthorized

3. **Verify User Isolation**
   - Login as User A, create tasks
   - Login as User B, fetch tasks
   - ✅ Expected: User B should NOT see User A's tasks

---

### Step 5: Test Task Update

**Expected Behavior:** Users can update their own tasks

**Test Cases:**

1. **Valid Update (Own Task)**
   ```json
   PUT /api/v1/tasks/:taskId
   Headers: Authorization: Bearer <token>
   {
     "title": "Updated Title",
     "status": "in-progress"
   }
   ```
   ✅ Expected: 200 OK, returns updated task

2. **Update Another User's Task**
   - Create task with User A
   - Try to update with User B's token
   - ✅ Expected: 403 Forbidden

3. **Update Non-existent Task**
   ```
   PUT /api/v1/tasks/000000000000000000000000
   Headers: Authorization: Bearer <token>
   ```
   ✅ Expected: 404 Not Found

4. **Update Without Authentication**
   ```
   PUT /api/v1/tasks/:taskId
   ```
   ✅ Expected: 401 Unauthorized

---

### Step 6: Test Task Deletion (Admin Only)

**Expected Behavior:** Only admins can delete tasks

**Test Cases:**

1. **Delete as Admin**
   ```
   DELETE /api/v1/tasks/:taskId
   Headers: Authorization: Bearer <admin_token>
   ```
   ✅ Expected: 200 OK

2. **Delete as Regular User**
   ```
   DELETE /api/v1/tasks/:taskId
   Headers: Authorization: Bearer <user_token>
   ```
   ✅ Expected: 403 Forbidden

3. **Delete Non-existent Task**
   ```
   DELETE /api/v1/tasks/000000000000000000000000
   Headers: Authorization: Bearer <admin_token>
   ```
   ✅ Expected: 404 Not Found

---

## Testing with Postman

### Setup

1. Import `PrimeTradeAI_Assignment.postman_collection.json`
2. Collection variables will be set automatically
3. Base URL: `{{baseUrl}}` = `http://localhost:5000/api/v1`

### Workflow

1. **Run "Register User"** → Token saved automatically
2. **Run "Login User"** → Token updated
3. **Run "Create Task"** → Task created with saved token
4. **Run "Get All Tasks"** → View all tasks
5. **Run "Update Task"** → Modify task (update `:id` parameter)
6. **Run "Register Admin User"** → Create admin account
7. **Run "Delete Task"** → Test admin deletion

### Auto Token Management

The collection has a test script that automatically saves the token:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.collectionVariables.set("token", jsonData.data.token);
}
```

---

## Testing with cURL

### Complete Test Sequence

```bash
# 1. Register a user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Test123456",
    "role": "user"
  }'

# Save the token from response

# 2. Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test123456"
  }'

# 3. Create a task (replace YOUR_TOKEN)
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "Testing task creation",
    "status": "pending"
  }'

# 4. Get all tasks
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Update a task (replace TASK_ID)
curl -X PUT http://localhost:5000/api/v1/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'

# 6. Register admin (for deletion test)
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "Admin123456",
    "role": "admin"
  }'

# 7. Delete task as admin
curl -X DELETE http://localhost:5000/api/v1/tasks/TASK_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## Frontend Testing

### Login Flow

1. Navigate to `http://localhost:5173`
2. Click "Register" or go to registration page
3. Fill in: username, email, password, role
4. Click "Register" button
5. ✅ Should redirect to login or dashboard
6. Verify token is stored in localStorage

### Task Management

1. Login with valid credentials
2. Navigate to Tasks page
3. **Create Task:**
   - Fill in title, description, status
   - Click "Create Task"
   - ✅ New task should appear in list
4. **Update Task:**
   - Click "Edit" on a task
   - Modify fields
   - Save changes
   - ✅ Task should update in list
5. **Delete Task (Admin only):**
   - Login as admin
   - Click "Delete" on a task
   - ✅ Task should be removed

### Logout

1. Click "Logout" button
2. ✅ Should redirect to login page
3. ✅ Token should be removed from localStorage
4. ✅ Protected pages should be inaccessible

---

## Common Test Scenarios

### Security Tests

1. **JWT Expiration**
   - Wait for token to expire (7 days by default)
   - Try to access protected route
   - ✅ Should return 401 Unauthorized

2. **Invalid Token**
   ```
   Authorization: Bearer invalid_token_here
   ```
   ✅ Should return 401 Unauthorized

3. **Malformed Token**
   ```
   Authorization: Bearer
   ```
   ✅ Should return 401 Unauthorized

4. **SQL Injection Attempt**
   ```json
   {
     "email": "test@test.com' OR '1'='1",
     "password": "test"
   }
   ```
   ✅ Should fail safely

### Edge Cases

1. **Very Long Task Title**
   - Create task with 1000+ character title
   - ✅ Check if validation works

2. **Special Characters**
   ```json
   {
     "title": "Task <script>alert('XSS')</script>",
     "description": "Test & verify < > special chars"
   }
   ```
   ✅ Should be sanitized

3. **Concurrent Updates**
   - Open task in two browsers
   - Update simultaneously
   - ✅ Last write wins (expected behavior)

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
mongosh
# or
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Issue: "jwt malformed"

**Solution:**
- Clear localStorage in browser
- Login again to get fresh token
- Check token format (should be Bearer <token>)

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000
# or
netstat -ano | findstr :5000

# Kill the process
kill -9 <PID>
```

### Issue: "CORS error"

**Solution:**
- Check `CLIENT_URL` in `.env`
- Verify CORS middleware in `server.js`
- Should allow `http://localhost:5173`

### Issue: "Password validation failed"

**Solution:**
- Ensure password is at least 6 characters
- Check password requirements in user model
- Verify bcrypt is working

---

## Test Checklist

Use this checklist before final submission:

- [ ] User registration works (user & admin)
- [ ] Login returns valid JWT token
- [ ] Token is required for protected routes
- [ ] Users can create tasks
- [ ] Users can view only their own tasks
- [ ] Users can update only their own tasks
- [ ] Only admins can delete tasks
- [ ] Regular users cannot delete tasks
- [ ] Invalid tokens are rejected
- [ ] Missing authentication returns 401
- [ ] Non-existent resources return 404
- [ ] Validation errors return 400
- [ ] Password is hashed in database
- [ ] Frontend displays errors properly
- [ ] Frontend displays success messages
- [ ] Logout clears token
- [ ] All CRUD operations work via UI

---

## Performance Testing (Optional)

### Load Testing with Apache Bench

```bash
# Test registration endpoint
ab -n 100 -c 10 -p register.json -T application/json \
  http://localhost:5000/api/v1/auth/register

# Test login endpoint
ab -n 1000 -c 50 -p login.json -T application/json \
  http://localhost:5000/api/v1/auth/login
```

---

## Final Verification

Before submitting:

1. ✅ All test cases pass
2. ✅ Postman collection works end-to-end
3. ✅ Frontend UI is functional
4. ✅ No console errors
5. ✅ Code is clean and commented
6. ✅ README is complete
7. ✅ .env.example is provided
8. ✅ .gitignore prevents sensitive data commit
9. ✅ All files are properly organized
10. ✅ Assignment requirements are met
