
import { db } from "../../../../config/firebaseConfig";


// Create a new document in a collection
export const createEventDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<string> => {
  try {
    await db.collection(collectionName).doc(id).set(data);
    return id;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create document in ${collectionName}: ${errorMessage}`);
  }
};


export const getAllEventDocuments = async <T>(
  collectionName: string
): Promise<(T & { id: string })[]> => {
  try {
    const snapshot = await db.collection(collectionName).get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to retrieve all documents in ${collectionName}: ${errorMessage}`);
  }
};


export const getEventDocumentById = async <T>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> => {
  try {
    const snapshot = await db.collection(collectionName).doc(id).get();

    if (!snapshot.exists) return null;

    return {
      id: snapshot.id,
      ...(snapshot.data() as T),
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to find the document in ${collectionName}: ${errorMessage}`);
  }
};

/**
 * Update a document by id.
 */
export const updatePostEventDoc = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).update(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update document in ${collectionName}: ${errorMessage}`);
  }
};

export const deletePostEventDoc = async (
  collectionName: string,
  id: string
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).delete();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete document ${id} from ${collectionName}: ${errorMessage}`);
  }
};
