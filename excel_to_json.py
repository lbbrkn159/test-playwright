import pandas as pd

# โหลดไฟล์ Excel
df = pd.read_excel("test_excel_to_json.xlsx", engine="openpyxl")  # หรือไม่ใส่ engine ถ้าใช้ .xls

df["appr"] = df["appr"].map(lambda x: f"{x:.2f}")


# แปลงเป็น JSON และบันทึกลงไฟล์
df.to_json("output.json", orient="records", indent=2, force_ascii=False)
