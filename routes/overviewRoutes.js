import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getOverviews } from '../controller/overviewController.js'


const overviewRoutes  = express.Router()
overviewRoutes.get('/overview', verifyToken, getOverviews)

export default overviewRoutes