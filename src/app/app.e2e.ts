import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Soundmoose';
    expect(subject).toEqual(result);
  });

  it('should display default genre selection', () => {
    let result = element(by.css('.top-tracks-header .selection .text')).getText();
    expect(result).toEqual('All music');
  });

  it('should be able to choose music genre', () => {
    let select = element(by.css('.top-tracks-header .selection'))
    select.click();
    select.$('[value="classical"]').click();
    element.all(by.tagName('option'))
    browser.pause();
    // expect(subject).toEqual(result);
  });
  // it('should default to all music', () => {
  //   browser.findElement  (by.cssContainingText('option', 'Pop')).click();
  //   // function selectDropdownByNumber(ele, index, milliseconds) {
  //   //   ele.findElements(by.tagName('option'))
  //   //     .then(function(options) {
  //   //       options[index].click();
  //   //     });
  //   //     if (typeof milliseconds !== 'undefined') {
  //   //       browser.sleep(milliseconds);
  //   //     }
  //   //   }
  //   // var mySelect = by.id('genre-select');
  //   // selectDropdownByNumber(mySelect, 2, undefined);
  //   // then(function(element) {
  //   //   console.log("ELEMENT!", element);
  //   // });
  //   // function selectOption(selector, item) {
  //   //   var selectList, desiredOption;

  //   //   selectList = this.findElement(selector);
  //   //   selectList.click();

  //   //   selectList.findElements(protractor.By.tagName('option'))
  //   //     .then(function findMatchingOption(options){


  //   //   })
  //   // }
  //   // let optionNum = 3;
  //   // // element(by.css('select')).click();
  //   // element(by.id('genre-select')).then(function(element) {
  //   //   console.log("THE SELECT TAG", element);
  //   // });

  //   // let options = element.all(by.css('option'));
  //   // browser.wait(function() {return options.isDisplayed()}, 2000);
  //   // options.then(function(options){
  //   //     options[optionNum].click();
  //   // });
  //   // let result = element(by.id('genre-select')).element(by.tagName('option')).getAttribute('value');
  //   // expect(result).toEqual('Classical');
  // });

  // it('should click a tile and play song', () => {
    // element.all(by.css('.track-tile')).first().element(by.tagName('img')).click();
    // function trackTiles(){
    //   var trackTiles = by.css('.track-tile');
    //   waitForElementToBePresent(trackTiles);
    //   return browser.findElements(trackTiles).then(function(elements){console.log("ELEMENTS!", elements);});
    // };
    // function waitForElementToBePresent(element){
    //   browser.wait(function () {
    //     return element.isPresent();
    //   },60000);

    //   browser.wait(function () {
    //     return element.isDisplayed();
    //   },60000);
    // };
    // trackTiles();
    // let result;
    // browser.wait(function() {
    //   result = element.all(by.css('.track-tile .album-art')).getAttribute('src');
    //   console.log("RESULTS", result);
    //   // .then(function(elements) {

    //   // console.log("RESULTS", elements.length);

    //   // });
    //   // browser.pause();
    //   // .then(function(elements) {
    //   //   console.log("TRACKS", elements);
    //   // });
    // }, 5000)
    // expect(result).toEqual(true);
    // browser.pause();

  // });

  // it('should hide footer at start', () => {
  //   let result;
  //   browser.wait(function() {
  //     result = browser.findElement(by.css('.footer')).isDisplayed();
  //   }, 5000);
  //   expect(result).toEqual(false);
  // });

});
