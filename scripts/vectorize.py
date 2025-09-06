import os
import json
import chromadb
from sentence_transformers import SentenceTransformer

# --- Configuration ---
DATA_DIRECTORY = "data/courses"
DB_DIRECTORY = "module_db"
COLLECTION_NAME = "course_modules"
MODEL_NAME = 'all-MiniLM-L6-v2'

def load_course_data(directory):
    all_modules = []
    print(f"Loading data from '{directory}'...")
    if not os.path.exists(directory):
        print(f"Error: Data directory '{directory}' not found.")
        return []
        
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    course_data = json.load(f)
                    course_id = course_data.get("course_id", "N/A")
                    course_name = course_data.get("course_name", "N/A")
                    
                    if "modules" in course_data and isinstance(course_data["modules"], list):
                        for module in course_data["modules"]:
                            module['course_id'] = course_id
                            module['course_name'] = course_name
                            all_modules.append(module)
            except json.JSONDecodeError:
                print(f"Warning: Could not decode JSON from {filename}")
            except Exception as e:
                print(f"An error occurred while processing {filename}: {e}")
                
    print(f"Successfully loaded {len(all_modules)} modules from {len(os.listdir(directory))} files.")
    return all_modules

def main():
    """
    Main function to create and populate the vector database.
    """
    print("--- Starting Vector DB Creation Process ---")

    courses = load_course_data(DATA_DIRECTORY)
    if not courses:
        print("No courses found. Exiting.")
        return

    print(f"Loading sentence transformer model: '{MODEL_NAME}'...")
    model = SentenceTransformer(MODEL_NAME)
    print("Model loaded successfully.")

    documents = []
    metadatas = []
    ids = []

    print("Preparing documents, metadata, and IDs for embedding...")
    for course in courses:
        tags_text = ', '.join(course.get('tags', []))
        combined_text = (
            f"{course.get('module_title', '')}. "
            f"{course.get('description', '')}. "
            f"Topics covered: {tags_text}"
        )
        
        documents.append(combined_text)

        metadatas.append({
            "course_id": course.get('course_id', 'N/A'),
            "course_name": course.get('course_name', 'N/A'),
            "module_id": course.get('module_id', 'N/A'),
            "module_title": course.get('module_title', 'N/A'),
            "description": course.get('description', 'N/A'),
        })

        ids.append(course.get('module_id', str(len(ids))))

    print(f"Prepared {len(documents)} documents for processing.")

    print("Generating embeddings for all modules... (This may take a moment)")
    embeddings = model.encode(documents, show_progress_bar=True)
    print("Embeddings generated successfully.")

    print(f"Setting up ChromaDB client in directory: '{DB_DIRECTORY}'")
    client = chromadb.PersistentClient(path=DB_DIRECTORY)
    
    print(f"Getting or creating collection: '{COLLECTION_NAME}'")
    collection = client.get_or_create_collection(name=COLLECTION_NAME)

    print("Adding documents to the ChromaDB collection...")
    collection.add(
        embeddings=embeddings.tolist(),
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )

    print("\n--- Success! ---")
    print(f"Vector database has been created and populated with {collection.count()} modules.")
    print(f"Database is stored in the '{DB_DIRECTORY}' directory.")

if __name__ == "__main__":
    main()
