import { Ics499FrontEndPage } from './app.po';

describe('ics499-front-end App', () => {
  let page: Ics499FrontEndPage;

  beforeEach(() => {
    page = new Ics499FrontEndPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
