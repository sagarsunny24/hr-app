import express from 'express'

const router = express.Router();

router.post('/register/company',registerCompany)
router.post('/hr/register',registerHR)
router.post('/hr/login',loginHR)
router.post('/employee/register'.registerEmployee)
router.post('/employee/login',loginEmployee)
router.post('/hr/logout',logoutHR)
router.post('employee/logout',logoutEmployee)
router.get('/refresh',handleRefresh)

export default router