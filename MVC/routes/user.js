import express from "express";
import User from "../models/user.js";
import {
  handleAllGetUsers,
  handleGetUserByID,
  handleUpdateUserByID,
  handleDeleteUserByID,
  handleCreateUserByID,
} from "../controllers/user.js";
const router = express.Router();

router.use(express.urlencoded({extended: false}));

//Routes-REST API Points
router
.route("/")
.get( handleAllGetUsers)
.post(handleCreateUserByID);

//ALL ROUTES WITH SAME ENDPOINT BUT DIFFERENT METHODS
router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUserByID)
  .delete(handleDeleteUserByID);



export default router;
