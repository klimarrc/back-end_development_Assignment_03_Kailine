import { Request, Response, NextFunction } from "express";
import * as postService from "../services/eventPostService";
import { successResponse } from "../models/responseModel";
import { EventPost } from "../models/eventPostModel";
import { HTTP_STATUS } from "src/constants/httpConstants";

// Create post handler - validates body only
export const createPostHandler = async (
    req: Request,
    res: Response,  
    next: NextFunction  
): Promise<void> => {
    try {

       const {id, name, capacity, registrationCount, status, category } = req.body;
       const createdAt = new Date().toISOString();
       const postData = {
        id,
        name,
        date: new Date(req.body.date),
        capacity,
        registrationCount,
        status,
        category,
        createdAt
       };
         const newPost = await postService.createEventPost(postData);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newPost, "Event created"));
    } catch (error: unknown) {
        next(error);
    }
};

export const getAllPostsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const posts = await postService.getAllEventPosts();
        res.status(HTTP_STATUS.OK).json(successResponse(posts));
    } catch (error: unknown) {
        next(error);
    }
};

export const getPostByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;
        const post = await postService.getPostById(id as string);
        res.status(HTTP_STATUS.OK).json(successResponse({post}, "Event retrieved successfully"));
    } catch (error: unknown) {
        next(error);    
    }


export const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
         const {id} = req.params;
         const {id, name, capacity, registrationCount, status, category} = req.body;
         const updatedAt = new Date().toISOString();    
         const updatePostData = { 
            id,
            name,
            capacity,
            registrationCount,
            status,
            category,
            updatedAt
         };
         const updatedEventPost = await postService.updateEvent({ id as string, updatePostData });
        res.status(HTTP_STATUS.OK).json(successResponse({updatedEventPost}, "Event updated"));
    } catch (error: unknown) {
        next(error);
    }
};



export const deletePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const deletedEvent = await postService.deletePost(id);
        res.status(HTTP_STATUS.NO_CONTENT).json(successResponse(deletedEvent, "Event deleted"));
    } catch (error: unknown) {
        next(error);
    }
};
