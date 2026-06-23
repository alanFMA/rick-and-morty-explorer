import { expect, test } from '@playwright/test';

test('Jornada de Detalhes: usuário abre um personagem e vê seus episódios', async ({ page }) => {
  await page.goto('/');

  const firstCard = page.locator('a[href^="/character/"]').first();
  const characterName = await firstCard.locator('h3').textContent();
  await firstCard.click();

  await expect(page).toHaveURL(/\/character\/\d+/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(characterName ?? '');
  await expect(page.getByRole('heading', { name: 'Episódios' })).toBeVisible();
});
