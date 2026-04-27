import { test, expect } from '@playwright/test'
import { LoginFlow } from '../02-flows/login-ca-flow'
import { ENV } from '../05-utils/config/env'
import { readUsers } from '../05-utils/excel-reader'

test.describe('Authentication - Login', () => {

	test('login as Retail Sales Manager', async ({ page }) => {

		const users: any[] = readUsers()

		// filter user ตาม organization structure
		const candidates = users.filter(u =>
			u.team === 'กลุ่มลงทุนในสินทรัพย์รอการขาย' &&
			u.position.includes('เจ้าหน้าที่')
		)

		// ตรวจสอบว่ามี user ตรงเงื่อนไขหรือไม่
		if (candidates.length === 0) {
			throw new Error('No user found for จนท. บล. A')
		}

		// ถ้ามีหลาย user ให้เลือกตัวแรก
		const user = candidates[0]

		console.log(`Using user: ${user.username} (${user.core_id})`)

		const loginFlow = new LoginFlow(page)

		await loginFlow.login(
			ENV.CA_UAT1_URL,
			user.username,
			user.password
		)

		// verify login success
		await expect(page).not.toHaveURL(/login/)

	})

})
