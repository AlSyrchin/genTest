import { test, expect } from '@playwright/test';
import { GenotekPage } from '@lk_pages/getCard';

let page;

test('Тест добавления товара Происхождения с промокодом', async ({ browser }) => {
    page = await browser.newPage();
    const genotekPage = await new GenotekPage(page);
    await genotekPage.goto();
    await genotekPage.toPressCard();
    const originalPriceValue = await genotekPage.getPrice();
    await genotekPage.toPromo();
    const discountedPriceValue = await genotekPage.getPrice();

  // Проверяем, что цена со скидкой меньше оригинальной
  expect(discountedPriceValue).toBeLessThan(originalPriceValue); 
});