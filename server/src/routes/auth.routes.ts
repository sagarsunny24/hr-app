import express from 'express'
import { registerCompany } from '@/controllers/auth.controller.js';
const router = express.Router();

router.post('/register/company',registerCompany)
// router.post('/login',loginUser)
// router.post('/hr/register',registerHR)
// router.post('/employee/register'.registerEmployee)

// router.post('/hr/logout',logoutHR)
// router.post('employee/logout',logoutEmployee)
// router.get('/refresh',handleRefresh)

export default router