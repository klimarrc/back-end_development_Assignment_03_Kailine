import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/eventControllers";
import { postSchemas } from "../validation/eventPostSchemas";



const router = express.Router();

// Create post - validates body only
router.post(
    "/",
    validateRequest(postSchemas.create),
    postController.createPostHandler
);

// Get all posts - no validation needed
router.get("/", postController.getAllPostsHandler);

// Get single post - validates params and optional query
router.get(
    "/:id",
    validateRequest(postSchemas.getById),
    postController.getPostByIdHandler
);

// Update post - validates both params and body
router.put(
    "/:id",
    validateRequest(postSchemas.update),
    postController.updatePostHandler
);

// Delete post - validates params only
router.delete(
    "/:id",
    validateRequest(postSchemas.delete),
    postController.deletePostHandler
);

export default router;
