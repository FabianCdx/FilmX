const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
import {Client, Databases, ID, Query } from "appwrite";
import type { Movie } from "./types";

const client = new Client();
const db = new Databases(client);

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);


export const updateSearchCount = async(searchTerm: string, movie: Movie) => {
    //. 1 use appwrite sdk to check if the search term exists in the database
    db.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", searchTerm)])
    .then((response) => {
        let doc = response.documents[0];
        if(response.total > 0 && response.documents.length > 0 ) {
            db.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {count: (doc.count || 0) + 1})
        } else {
            db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {"searchTerm": searchTerm, "poster_url": movie.poster_path, "movie_id": movie.id})
            console.log("Doc erstellt");
        }
    });
    // 2. if it does update the count
    // 3. If it doesn't, create a new document with search term and count and set the count as 1
}

export default updateSearchCount;