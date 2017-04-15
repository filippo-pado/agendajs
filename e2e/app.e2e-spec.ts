import { TestAppPage } from './app.po';

describe('Test app', () => {
  let page: TestAppPage;

  beforeEach(() => {
    page = new TestAppPage();
  });

  it('should have a toolbar AgendaJS', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('AgendaJS');
  });
});
