
import { db } from "../../../../config/firebaseConfig";
import { FirestoreDataTypes } from "../types/firestore";

interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}

// Run a Firestore transaction
export const runTransaction = async <T>(
    operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
    try {
        return await db.runTransaction(operations);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Transaction failed: ${errorMessage}`);
    }
};

// Create a new document in a collection
export const createEvent = async <T>(
    collectionName: string,
    data: Partial<T>
): Promise<string> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).add(data);
        
        return docRef.id;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

// Get all documents in a collection
export const getAllEvents= async <T>(
    collectionName: string
): Promise<T[]> => {
    try{
        const snapshot = await db.collection(collectionName).get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ... (doc.data() as T),
          }
        ));

    }catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all documents in ${collectionName}: ${errorMessage}`
        );
    }
};

// Finding a document by ID
export const getEventById = async <T>(
    collectionName: string,
    id: string,
): Promise<T | null> => {
    try{
        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).doc(id);

        const snapshot = await docRef.get();

        if(!snapshot.exists){
            return null;
        }

        return {
            id: snapshot.id,
            ... (snapshot.data() as T),
        }

    }catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to find the document in ${collectionName}: ${errorMessage}`
        );
    }
};

//Updating a document by ID
export const updatePostEvent = async <T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(data);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update document in ${collectionName}: ${errorMessage}`
        );
    }
};

// Deleting a document by ID
export const deletePostEvent = async (
    collectionName: string,
    id: string,
    transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
    try {
        const docRef: FirebaseFirestore.DocumentReference = db
            .collection(collectionName)
            .doc(id);
        if (transaction) {
            transaction.delete(docRef);
        } else {
            await docRef.delete();
        }
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete document ${id} from ${collectionName}: ${errorMessage}`
        );
    }
};

// Deleting documents by field values
export const deleteDocumentsByFieldValues = async (
    collectionName: string,
    fieldValuePairs: FieldValuePair[],
    transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
    try {
        let query: FirebaseFirestore.Query = db.collection(collectionName);

        // Apply all field-value filters
        fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
            query = query.where(fieldName, "==", fieldValue);
        });

        let snapshot: FirebaseFirestore.QuerySnapshot;

        if (transaction) {
            snapshot = await transaction.get(query);
            snapshot.docs.forEach((doc) => {
                transaction.delete(doc.ref);
            });
        } else {
            snapshot = await query.get();
            const batch: FirebaseFirestore.WriteBatch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
    } catch (error: unknown) {
        const fieldValueString: string = fieldValuePairs
            .map(({ fieldName, fieldValue }) => `${fieldName} == ${fieldValue}`)
            .join(" AND ");
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete documents from ${collectionName} where ${fieldValueString}: ${errorMessage}`
        );
    }
};