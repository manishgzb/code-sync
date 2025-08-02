const {Router} = require("express")
const {login,signup,signupget} = require("../controllers/authControllers")
const authRouter = Router()
authRouter.post('/login',login)
authRouter.post('/signup',signup)
authRouter.get('/signup',signupget)
module.exports = authRouter