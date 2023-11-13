import Basic from './basic';
import config from './config';
import {Selector} from 'testcafe';
fixture `test div controls`
  .page `${config.baseUrl}`;
const basic = new Basic();
const checkBox = Selector('veda-control[data-type="checkbox"] div.checkbox').find('label').withText('Спецификация тестового объектного свойства');
const radioButton = Selector('veda-control[data-type="radio"] div.radio').find('label').withText('Спецификация тестового календарного свойства');
test('testDivControls', async (t) => {
  basic.login('karpovrt', '123');
  await t
    .click('#menu')
    .click('li[id="menu"] li[resource="v-s:Create"]')
    .click('veda-control.fulltext.dropdown')
    .pressKey('ctrl+a delete')
    .typeText('veda-control.fulltext.dropdown', 'Класс для тестирования интерфейса')
    .click('.suggestion[resource="v-ui:TestUIClass"]')
    .typeText('veda-control.-view.edit.search[property="rdfs:label"]', 'Тест контролов')
    .wait(1000)
    .expect(Selector('div.container.sheet h3[property="rdfs:label"] span.value-holder').innerText).eql('Тест контролов')
    .typeText('veda-control#testString', 'Тестовое текстовое свойство')
    .wait(1000)
    .expect(Selector('div.container.sheet div[property="v-ui:testString"] span.value-holder').innerText).eql('Тестовое текстовое свойство')
    .click('veda-control[property="v-ui:testInteger"][data-type="integer"]')
    .typeText('veda-control[property="v-ui:testInteger"][data-type="integer"]', '111777')
    .wait(1000)
    .expect(Selector('div.container.sheet div[property="v-ui:testInteger"] span.value-holder').innerText).eql('111 777')
    .click('veda-control[property="v-ui:testDecimal"][data-type="decimal"]')
    .typeText('veda-control[property="v-ui:testDecimal"][data-type="decimal"]', '1113.14159265')
    .wait(1000)
    .expect(Selector('div.container.sheet div[property="v-ui:testDecimal"] span.value-holder').innerText).eql('1 113,14159265')
    .click('veda-control#date')
    .pressKey('ctrl+a delete')
    .typeText('veda-control#date', '29051990')
    .click('veda-control[property="v-ui:testDecimal"]')
    .wait(1000)
    .expect(Selector('div.container.sheet div[property="v-ui:testDatetime"] span.value-holder').innerText).eql('29.05.1990')
    .click('veda-control[data-type="dateTime"]')
    .pressKey('ctrl+a delete')
    .typeText('veda-control[data-type="dateTime"]', '280519891232')
    .click('veda-control[property="v-ui:testDecimal"]')
    .wait(1000)
    .expect(Selector('div.container.sheet div[property="v-ui:testDatetime"] span.value-holder').innerText).eql('28.05.1989 12:32')
    .click(checkBox)
    .wait(1000)
    .expect(Selector('div.container.sheet div[rel="v-ui:testLink"] span#label').innerText).eql('Спецификация тестового объектного свойства')
    .click(radioButton)
    .wait(1000)
    .expect(Selector('div.container.sheet div[rel="v-ui:testLink"] span#label').innerText).eql('Спецификация тестового календарного свойства');
});
