import { Router } from "express";
import UserController from "../../controllers/user.controller";
import {
    validationForBody,
    tryCatchMiddleware,
} from "./../../middlewares/validates";
import { userSchema } from "../../types/user.types";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
    "/signup",
    validationForBody(userSchema),
    tryCatchMiddleware(UserController.signUp.bind(UserController))
);
router.post(
    "/signin",
    validationForBody(userSchema),
    tryCatchMiddleware(UserController.signIn.bind(UserController))
);

export default router;
