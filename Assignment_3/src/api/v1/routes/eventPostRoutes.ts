iimport express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/eventControllers";
import { postSchemas } from "../validation/eventPostSchemas";

const router = express.Router();

// Create a new event post
router.post("/", validateRequest({ body: postSchemas.createPostSchema }), postController.createEventPost);
// Get all event posts
router.get("/", postController.getAllEventPosts);
// Get a specific event post by ID
router.get("/:id", postController.getEventPostById);
// Update an existing event post
router.put("/:id", validateRequest({ body: postSchemas.updatePostSchema }), postController.updateEventPost);
// Delete an event post
router.delete("/:id", postController.deleteEventPost);



export default router;