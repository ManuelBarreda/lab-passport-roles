const express = require('express')
const router = express.Router()

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' })


// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get('/perfil', ensureAuthenticated, checkRole(['BOSS', 'DEV', 'TA', 'STUDENT', 'GUEST']), (req, res) => res.render('profile', { user: req.user, isAdmin: req.user.role.includes('BOSS') }))
router.get('/editar-contenidos', ensureAuthenticated, checkRole(['BOSS']), (req, res) => res.render('context-editor', { user: req.user, isBoss: req.user.role.includes('BOSS') }))


module.exports = router