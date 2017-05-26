// Copyright 2017 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Utilities for manipulating the collection player when
 * carrrying out end-to-end testing with protractor.
 */

var general = require('./general.js');
var player = require('./player.js');

// Visit the demo collection
var goToDemoCollection = function() {
  browser.get('/collection/0');
};

// Check that the "SIGN IN" button appears correctly in guest's view.
var checkSignInButtonAsGuest = function() {
  var text = element(by.css('.protractor-test-sign-in-button')).getText();
  expect(text).toBe('SIGN IN');
};

// Play the middle exploration as a guest.
var playMiddleExplorationAsGuest = function() {
  // Start the middle (third) exploration.
  var explButton = element.all(by.css(
    '.protractor-test-collection-expl-node')).get(2);
  explButton.click();

  player.submitAnswer('NumericInput', 6);
    
  answer = 'If there are n choices for a given position,' +
    'then there are n-1 choices for the next, etc...';
  player.submitAnswer('TextInput', answer);
  player.clickThroughToNextCard();

  player.submitAnswer('NumericInput', 24);
  player.clickThroughToNextCard();
};

// Verify that the suggested exploration is the expected one.
var verifySuggestedExplorationAsGuest = function() {
  explTitle = element.all(by.css(
    '.protractor-test-exp-summary-tile-title')).first().getText();
  expect(explTitle).toBe('Demonstrating string classifier');
}

// Verify that upon returning to demo collection, there are 5 
//   uncompleted explorations (since this is a guest).
var verifyCollectionStateUnchanged = function() {
  explNodes = element.all(by.css(
    '.protractor-test-uncompleted-expl-thumbnail'));
  count = explNodes.count();
  expect(count).toEqual(5);
}

exports.goToDemoCollection = goToDemoCollection;
exports.checkSignInButtonAsGuest = checkSignInButtonAsGuest;
exports.playMiddleExplorationAsGuest = playMiddleExplorationAsGuest;
exports.verifySuggestedExplorationAsGuest = verifySuggestedExplorationAsGuest;
exports.verifyCollectionStateUnchanged = verifyCollectionStateUnchanged;
