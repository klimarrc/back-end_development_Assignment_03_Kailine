import { EventCategory, EventPost, EventStatus } from "../models/eventPostModel";
import * as firestoreRepository from "../repositories/firestoreRepository";


const COLLECTION = "posts";

export const createEventPost = async (postData: 
    {id: string,
     name: string,
     capacity: number,
     registrationCount: number,
     date: Date,
     status: EventStatus,
     category: EventCategory}): Promise<EventPost> => { 
    
     
    try {
        const newEventPost = {
            ...postData,
            date: new Date(postData.date),  
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const createdId = await firestoreRepository.createEvent<EventPost>(COLLECTION, newEventPost);
        return {...newEventPost, id: createdId}
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create post: ${errorMessage}`
        );
    }
};

export const getAllEventPosts = async (): Promise<EventPost[]> => {
    try {
        const posts = await firestoreRepository.getAllEvents<EventPost>(COLLECTION);
        return posts;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get all posts: ${errorMessage}`
        );
    }
};

export const getPostById = async (id: string): Promise<EventPost> => {
    try {
        const post = await firestoreRepository.getEventById<EventPost>(COLLECTION, id);
        if (!post) {
            throw new Error("Post not found");
        }   
        return post;    
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get post by ID: ${errorMessage}`
        );
    }
};

export const updatePostEvent = async (postData:
    {id: string,
     name: string,
     capacity: number,
     registrationCount: number,
     date: Date,
     status: EventStatus,
     category: EventCategory}): Promise<EventPost> => { 
    try {
        const updatedEventPost: Partial<EventPost> = {};
        if (postData.id !== undefined){
            updatedEventPost.id = postData.id;
        }
        if (postData.name !== undefined){
            updatedEventPost.name = postData.name;
        }
        if (postData.capacity !== undefined){
            updatedEventPost.capacity = postData.capacity;
        }
        if (postData.registrationCount !== undefined){
            updatedEventPost.registrationCount = postData.registrationCount;
        }
        if (postData.date !== undefined){
            updatedEventPost.date = new Date(postData.date);
        }
        if (postData.status !== undefined){
            updatedEventPost.status = postData.status;
        }
        if (postData.category !== undefined){
            updatedEventPost.category = postData.category;
        } 

        if (Object.keys(updatedEventPost).length === 0) {
            throw new Error("No valid fields provided for update");
        }

        updatedEventPost.updatedAt = new Date();

        await firestoreRepository.updatePostEvent<EventPost>(COLLECTION, postData.id, updatedEventPost);
        const updatedPost = await firestoreRepository.getEventById<EventPost>(COLLECTION, postData.id);
        if (!updatedPost) {
            throw new Error("Post not found after update");
        }   
        return updatedPost;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update post: ${errorMessage}`
        );
    }
};

export const deletePostEvent = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deletePostEvent(COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete post: ${errorMessage}`
        );
    }       
};
