
import{adminPanel} from '../controllers/Admin.js'

import express from 'express'
const router = express.Router()
router.get("/admin",adminPanel)





export default router