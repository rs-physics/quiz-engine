import csv
import json
import sys
from pathlib import Path


def convert_csv_to_json(csv_path: Path) -> Path:
    if not csv_path.exists():
        raise FileNotFoundError(f"Could not find file: {csv_path}")

    output_path = csv_path.with_suffix(".json")
    questions = []

    with csv_path.open("r", encoding="utf-8-sig", newline="") as csv_file:
        reader = csv.DictReader(csv_file)

        required_columns = {
            "ID",
            "Topic",
            "Question",
            "AnswerA",
            "AnswerB",
            "AnswerC",
            "AnswerD",
            "CorrectAnswer",
        }

        missing_columns = required_columns - set(reader.fieldnames or [])
        if missing_columns:
            raise ValueError(f"Missing columns: {', '.join(sorted(missing_columns))}")

        for row in reader:
            question = {
                "id": int(row["ID"]),
                "topic": row["Topic"].strip(),
                "question": row["Question"].strip(),
                "answers": [
                    row["AnswerA"].strip(),
                    row["AnswerB"].strip(),
                    row["AnswerC"].strip(),
                    row["AnswerD"].strip(),
                ],
                "correct": int(row["CorrectAnswer"]),
            }

            questions.append(question)

    with output_path.open("w", encoding="utf-8") as json_file:
        json.dump(questions, json_file, indent=4, ensure_ascii=False)

    return output_path


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python csv_to_json.py QuestionBank.csv")
        sys.exit(1)

    csv_path = Path(sys.argv[1])
    output_path = convert_csv_to_json(csv_path)

    print(f"Converted {csv_path.name} -> {output_path.name}")


if __name__ == "__main__":
    main()