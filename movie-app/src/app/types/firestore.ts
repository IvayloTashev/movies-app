interface FirestoreFieldValue {
    stringValue?: string;
    integerValue?: string;
    booleanValue?: boolean;
    doubleValue?: number;
    // Add more types as needed
  }
  
  interface FirestoreDocument {
    name: string;
    fields: {
      [key: string]: FirestoreFieldValue;
    };
  }
  
export interface FirestoreResponse {
    documents: FirestoreDocument[];
  }