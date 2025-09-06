import chromadb
from sentence_transformers import SentenceTransformer

# --- Configuration ---
DB_DIRECTORY = "module_db"
COLLECTION_NAME = "course_modules"
MODEL_NAME = 'all-MiniLM-L6-v2'

def query_relevant_modules(weakness_topics, n_results=5):
    if not weakness_topics:
        print("Error: Weakness topics list cannot be empty.")
        return None

    print(f"\nSearching for modules related to: {', '.join(weakness_topics)}")

    print(f"Loading sentence transformer model: '{MODEL_NAME}'...")
    model = SentenceTransformer(MODEL_NAME)

    print(f"Connecting to ChromaDB at '{DB_DIRECTORY}'...")
    try:
        client = chromadb.PersistentClient(path=DB_DIRECTORY)
        collection = client.get_collection(name=COLLECTION_NAME)
    except Exception as e:
        print(f"Error connecting to ChromaDB or getting collection: {e}")
        print("Please ensure 'create_vector_db.py' has been run successfully.")
        return None

    query_text = f"Find educational modules covering the topics of: {', '.join(weakness_topics)}"
    print(f"Generated query: \"{query_text}\"")

    query_embedding = model.encode(query_text).tolist()

    print(f"Querying for top {n_results} results...")
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    
    return results

def display_results(results):
    if not results or not results.get('metadatas'):
        print("\nNo results found or an error occurred during the query.")
        return

    print("\n--- Top Recommended Modules ---")
    
    metadatas = results['metadatas'][0]
    distances = results['distances'][0]

    if not metadatas:
        print("No matching modules found in the database.")
        return
        
    for i, (meta, dist) in enumerate(zip(metadatas, distances)):
        print(f"\n{i+1}. Recommendation (Similarity Score: {1 - dist:.2f})")
        print(f"   Course: {meta.get('course_name', 'N/A')}")
        print(f"   Module: {meta.get('module_title', 'N/A')}")
        print(f"   Module ID: {meta.get('module_id', 'N/A')}")
        print(f"   Description: {meta.get('description', 'N/A')}")
    print("\n------------------------------")


def main():
    sample_weakness_topics = ["regression"]
    results = query_relevant_modules(sample_weakness_topics, n_results=5)
    if results:
        display_results(results)

if __name__ == "__main__":
    main()
