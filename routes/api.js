const express = require('express');
const router = express.Router();

const AuthRouter = require("./api/Auth");

router.use("/auth", AuthRouter);

module.exports = router;