import express from "express";
const router = express.Router();
import {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
  getStudent,
} from "../../controllers/studentsController.mjs";
import ROLES_LIST from "../../config/rolesList.mjs";
import verifyRoles from "../../middleware/verifyRoles.mjs";

// router
//   .route("/")
//   .get(getAllStudents)
//   .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewStudent)
//   .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateStudent)
//   .delete(verifyRoles(ROLES_LIST.Admin), deleteStudent);
router
  .route("/")
  .get(getAllStudents)
  .post(createNewStudent)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    updateStudent
  )
  .delete(verifyRoles(ROLES_LIST.Admin), deleteStudent);

router.route("/:id").get(getStudent).put(updateStudent);

export default router;
