const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/task.controllers");

router.use(auth);
router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.put("/:id", controller.updateTask);
router.delete("/:id", role("admin"), controller.deleteTask);

module.exports = router;