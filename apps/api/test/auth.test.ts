import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { prisma } from '../src/config/prisma.js';

const app = createApp();

describe('Auth Module & Server Health', () => {
  beforeAll(async () => {
    // Clean up test user if exists
    await prisma.user.deleteMany({
      where: { email: 'test.user@manmitra.org' },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: 'test.user@manmitra.org' },
    });
    await prisma.$disconnect();
  });

  it('GET /health returns 200 and healthy payload', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.app).toBe('ManMitra API');
  });

  it('POST /api/v1/auth/register creates a new user with Argon2id and sets auth cookie', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        fullName: 'Aarav Deshmukh',
        email: 'test.user@manmitra.org',
        password: 'Password123#',
        preferredLang: 'mr',
        termsConsent: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('test.user@manmitra.org');
    expect(res.body.data.user.role).toBe('CUSTOMER');
    expect(res.body.data.token).toBeDefined();

    // Verify Set-Cookie header
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain('manmitra_token=');
    expect(cookies[0]).toContain('HttpOnly');
  });

  it('POST /api/v1/auth/register rejects duplicate email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        fullName: 'Duplicate Aarav',
        email: 'test.user@manmitra.org',
        password: 'Password123#',
        preferredLang: 'mr',
        termsConsent: true,
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  it('POST /api/v1/auth/login logs in with newly registered user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test.user@manmitra.org',
        password: 'Password123#',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('test.user@manmitra.org');
    expect(res.body.data.token).toBeDefined();
  });

  it('POST /api/v1/auth/login authenticates seeded bcrypt user (admin@manmitra.org)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@manmitra.org',
        password: 'Admin#Manmitra2026',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe('SUPER_ADMIN');
  });

  it('GET /api/v1/auth/me returns current user profile when authenticated', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test.user@manmitra.org',
        password: 'Password123#',
      });

    const cookie = loginRes.headers['set-cookie'];

    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Cookie', cookie);

    expect(meRes.status).toBe(200);
    expect(meRes.body.success).toBe(true);
    expect(meRes.body.data.user.email).toBe('test.user@manmitra.org');
  });

  it('POST /api/v1/auth/logout clears auth cookie and invalidates session', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test.user@manmitra.org',
        password: 'Password123#',
      });

    const cookie = loginRes.headers['set-cookie'];

    const logoutRes = await request(app)
      .post('/api/v1/auth/logout')
      .set('Cookie', cookie);

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.success).toBe(true);

    // Now requesting /me with the old cookie should fail
    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Cookie', cookie);

    expect(meRes.status).toBe(401);
  });
});
