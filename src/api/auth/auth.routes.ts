import { Router } from 'express'
import { auth } from './auth.controller'

const router = Router()

router.get('/protected', auth.protected)

router.post('/register', auth.register)

router.post('/login', auth.login)

router.post('/logout', auth.logout)


export default router