import * as express from "express";
import AuthRouter from "../src/api/Auth/";
const router = express.Router();

router.use('/auth', AuthRouter);

module.exports = router;
