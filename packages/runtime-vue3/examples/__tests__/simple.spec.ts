import path from 'path'
import { E2E_TIMEOUT, setupPuppeteer } from '../../__tests__/e2eUtils'

describe('e2e: Renderer', () => {
  const { page, html, nextFrame, timeout } = setupPuppeteer()
  const baseUrl = `file://${path.resolve(__dirname, '../htmls/simple.html')}`

  beforeEach(async () => {
    await page().goto(baseUrl)
    await page().waitForSelector('#app')
  })

  it(
    'simple render',
    async () => {
      await page().evaluate(() => {})
    },
    E2E_TIMEOUT
  )
})
