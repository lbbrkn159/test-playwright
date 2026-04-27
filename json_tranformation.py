import sys
import json

def pretty_print_json(input_text: str, indent: int = 4) -> str:
    """
    แปลง JSON text ให้เป็นรูปแบบสวยงาม (pretty-printed)
    """
    parsed = json.loads(input_text)
    return json.dumps(parsed, indent=indent, ensure_ascii=False)

def main():
    if len(sys.argv) > 1:
        # อ่านจากไฟล์
        with open(sys.argv[1], 'r', encoding='utf-8') as f:
            raw_json = f.read()
    else:
        # อ่านจาก stdin
        raw_json = sys.stdin.read()

    try:
        pretty_json = pretty_print_json(raw_json)
        print(pretty_json)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()