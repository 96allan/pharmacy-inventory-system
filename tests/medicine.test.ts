import request from 'supertest';
import express from 'express';
import medicineRoutes from '../src/routes/medicineRoutes';

const app = express();
app.use(express.json());
app.use('/api/medicines', medicineRoutes);

describe('Medicine routes', () => {
  it('should return 200 for GET /api/medicines', async () => {
    const res = await request(app).get('/api/medicines');
    expect(res.statusCode).toBe(200);
  });
});
