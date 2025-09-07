# Python script to extract questions from the JSON files and create a simplified JavaScript version
import json
import os

# Define the paths to the JSON files
data_dir = "./data/questions"
output_dir = "./client/src/data"
question_files = {
    "data_science": "data_science.json",
    "cloud_devops": "cloud_devops.json",
    "full_stack": "full_stack.json"
}

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# Process each question file
for track, filename in question_files.items():
    # Read the JSON file
    file_path = os.path.join(data_dir, filename)
    try:
        with open(file_path, "r") as file:
            data = json.load(file)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        continue

    # Extract the questions
    questions = data.get("assessment_questions", [])
    
    # Filter out incomplete questions
    valid_questions = []
    for q in questions:
        if q.get("questionID") and q.get("type") and q.get("question") and q.get("options") and q.get("moduleId"):
            valid_questions.append(q)
    
    # Create a simplified version of the questions for the client
    output = {
        "assessment_questions": valid_questions
    }
    
    # Save to the output directory
    output_file = os.path.join(output_dir, f"{track}_questions.js")
    try:
        with open(output_file, "w") as file:
            file.write(f"// Auto-generated from {filename}\n")
            file.write("export const questions = ")
            json.dump(output, file, indent=2)
            file.write(";\n\nexport default questions;\n")
        print(f"Created {output_file} with {len(valid_questions)} questions")
    except Exception as e:
        print(f"Error writing {output_file}: {e}")

print("Done!")
