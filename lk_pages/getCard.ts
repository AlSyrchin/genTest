// login.ts
import { expect, Locator, Page } from '@playwright/test';

export class GenotekPage {
  readonly page: Page;
  readonly getEmailInput: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.getEmailInput = page.getByPlaceholder('Email or username');
  }
  
  async goto() {
    // Открываем основной сайт
    await this.page.goto('https://basket.genotek.ru');
  }
  
  async toPressCard() {
    // Нажимаем на "Происхождение" и ждем
    await this.page.click('a.app-button.app-button--primary.basket-order__choose-card-order');
	  await this.page.waitForTimeout(1000);
  }

  async getPrice() {
    const priceSelector = 'div.basket-order__report-total priceroller';
    // Ожидаем, пока элемент с ценой появится на странице
    await this.page.waitForSelector(priceSelector);
    // Извлекаем текст, содержащий цену
    const priceElement = await this.page.$(priceSelector);
    const priceText = await priceElement?.textContent();
    //Выводим в консоль для проверки
    console.log(`Цена: ${priceText.trim()}`);
    //Оставляем только число
    return parseFloat(priceText.replace('₽', '').trim());
  }

  async toPromo() {
    //Кликаем на плейсхолдер с промокодом
    await this.page.click('text=У меня есть промокод');
    const getPromoInput = await this.page.getByPlaceholder('Введите промокод');
    //Вводим промокод
    await getPromoInput.fill('genotek5');
    //Кликаем на форму для активации промокода
    await this.page.click('text=Итого');
  }
}
module.exports = { GenotekPage };