import * as XLSX from 'xlsx'
import path from 'path'

export function readUsers() {

	const filePath = path.resolve('05-data/credentials.xlsx')

	const workbook = XLSX.readFile(filePath)

	const sheet = workbook.Sheets['users']

	const users = XLSX.utils.sheet_to_json(sheet)

	return users

}
