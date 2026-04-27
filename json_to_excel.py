import pandas as pd
import json


dataname = "parssproxy_subdistrict_202603271310"

def main(dataname: str):
    # อ่านไฟล์ JSON
# โหลด JSON
    with open(dataname+'.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # สร้าง Excel writer
    with pd.ExcelWriter(dataname+'.xlsx', engine='openpyxl') as writer:

        for sheet_name, rows in data.items():
            # แปลงแต่ละ sheet เป็น DataFrame
            df = pd.json_normalize(rows)

            # เขียนลงแต่ละ sheet
            df.to_excel(writer, sheet_name=sheet_name, index=False)

    print(f"แปลงเสร็จแล้ว: {dataname}.xlsx")


main(dataname)
