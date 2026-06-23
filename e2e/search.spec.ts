import { expect, test } from '@playwright/test';

test('Jornada de Busca: usuário filtra por nome e status', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Buscar personagem por nome').fill('Rick');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page).toHaveURL(/name=Rick/);

  await page.getByRole('button', { name: 'Mortos' }).click();
  await expect(page).toHaveURL(/status=Dead/);

  const cards = page.locator('a[href^="/character/"]');
  await expect(cards.first()).toBeVisible();

  const cardCount = await cards.count();
  for (let i = 0; i < cardCount; i += 1) {
    await expect(cards.nth(i)).toContainText('Dead');
  }
});
