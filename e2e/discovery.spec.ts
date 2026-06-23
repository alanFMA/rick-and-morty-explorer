import { expect, test } from '@playwright/test';

test('Jornada de Descoberta: usuário vê personagens e navega para a próxima página', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Vitrine de Personagens' })).toBeVisible();
  const firstPageCards = page.locator('a[href^="/character/"]');
  await expect(firstPageCards.first()).toBeVisible();
  const firstCharacterOnPageOne = await firstPageCards.first().textContent();

  await page.getByRole('button', { name: 'Próxima' }).click();
  await expect(page).toHaveURL(/page=2/);

  const firstPageTwoCards = page.locator('a[href^="/character/"]');
  await expect(firstPageTwoCards.first()).toBeVisible();
  await expect(firstPageTwoCards.first()).not.toHaveText(firstCharacterOnPageOne ?? '');
});
