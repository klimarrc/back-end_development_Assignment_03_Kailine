import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controller/eventPostController";
import { postSchemas } from "../validation/eventPostSchemas";

const router = express.Router();

// Create post - validates body only
router.post(
    "/",
    validateRequest(postSchemas.,
    postController.createPost
);

// Get single post - validates params and optional query
router.get(
    "/:id",
    validateRequest(postSchemas.getById.name("GetPostById")),
    postController.getPost
);

// Update post - validates both params and body
router.put(
    "/:id",
    validateRequest(postSchemas.update),
    postController.updatePost
);

// Delete post - validates params only
router.delete(
    "/:id",
    validateRequest(postSchemas.delete),
    postController.deletePost
);

// List posts - validates query parameters for filtering/pagination
router.get("/", validateRequest(postSchemas.list), postController.listPosts);

// Example with custom validation options
router.post(
    "/flexible",
    validateRequest(postSchemas.create, { stripBody: false }),
    postController.createPostFlexible
);

export default router;
