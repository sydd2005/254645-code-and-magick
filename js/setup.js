'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var SIMILAR_WIZARDS_COUNT = 4;

var generateRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template');
if (similarWizardTemplate) {
  var setupSimilarItemTemplate = similarWizardTemplate.content.querySelector('.setup-similar-item');
}

var generateSimilarWizards = function (wizardsCount) {
  var similarWizards = [];

  for (var i = 0; i < wizardsCount; i++) {
    similarWizards[i] = {
      name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)],
      coatColor: COAT_COLORS[generateRandomIndex(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[generateRandomIndex(EYES_COLORS.length)],
    };
  }

  return similarWizards;
};

var createWizardElement = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  var nameLabelElement = wizardElement.querySelector('.setup-similar-label');
  if (nameLabelElement) {
    nameLabelElement.textContent = wizard.name;
  }

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  if (wizardCoatElement) {
    wizardCoatElement.style.fill = wizard.coatColor;
  }

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  if (wizardEyesElement) {
    wizardEyesElement.style.fill = wizard.eyesColor;
  }

  return wizardElement;
};

var createSimilarWizardsFragment = function (wizards) {
  var wizardsFragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    wizardsFragment.appendChild(createWizardElement(wizards[i], setupSimilarItemTemplate));
  }

  return wizardsFragment;
};

var setupModal = document.querySelector('.setup');
var similarListElement = setupModal.querySelector('.setup-similar-list');

if (setupModal) {
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setupModal.querySelector('.setup-close');

  var userNameInput = setupModal.querySelector('.setup-user-name');
  if (userNameInput) {
    userNameInput.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length < 2) {
        target.setCustomValidity('Имя должно состоять минимум из двух символов');
      } else {
        target.setCustomValidity('');
      }
    });
  }

  var generateKeyEventListener = function (keyCode, eventHandler) {
    var keyEventHandler = function (evt) {
      var pressedKeyCode = evt.keyCode;
      if (pressedKeyCode === ESC_KEYCODE && evt.target === userNameInput) {
        return;
      }
      if (pressedKeyCode === keyCode) {
        evt.preventDefault();
        eventHandler();
      }
    };

    return {
      handleEvent: keyEventHandler
    };
  };

  var generateChangeColorListener = function (inputName, colorArray, styleProperty) {
    return function (evt) {
      var targetStyle = evt.target.style;
      var currentColor = targetStyle[styleProperty];
      do {
        var newColor = colorArray[generateRandomIndex(colorArray.length)];
      } while (newColor === currentColor);
      targetStyle[styleProperty] = newColor;
      var correspondingInput = setupModal.querySelector('input[name=' + inputName + ']');
      if (correspondingInput) {
        correspondingInput.value = newColor;
      }
    };
  };

  var wizardCoatElement = setupModal.querySelector('.setup-wizard .wizard-coat');
  if (wizardCoatElement) {
    var wizardCoatElementClickHandler = generateChangeColorListener('coat-color', COAT_COLORS, 'fill');
  }

  var wizardEyesElement = setupModal.querySelector('.setup-wizard .wizard-eyes');
  if (wizardEyesElement) {
    var wizardEyesElementClickHandler = generateChangeColorListener('eyes-color', EYES_COLORS, 'fill');
  }

  var fireballElement = setupModal.querySelector('.setup-fireball-wrap');
  if (fireballElement) {
    var fireballElementClickHandler = generateChangeColorListener('fireball-color', FIREBALL_COLORS, 'background-color');
  }

  var closeSetupModal = function () {
    setupModal.classList.add('hidden');
    document.removeEventListener('keydown', modalEscPressListener);
    if (wizardCoatElement) {
      wizardCoatElement.removeEventListener('click', wizardCoatElementClickHandler);
    }
    if (wizardEyesElement) {
      wizardEyesElement.removeEventListener('click', wizardEyesElementClickHandler);
    }
    if (fireballElement) {
      fireballElement.removeEventListener('click', fireballElementClickHandler);
    }
  };

  var modalEscPressListener = generateKeyEventListener(ESC_KEYCODE, closeSetupModal);

  var showSetupModal = function () {
    if (similarListElement) {
      similarListElement.innerHTML = '';
      var similarWizards = generateSimilarWizards(SIMILAR_WIZARDS_COUNT);
      var similarWizardsFragment = createSimilarWizardsFragment(similarWizards);
      similarListElement.appendChild(similarWizardsFragment);
    }

    var setupSimilarSection = setupModal.querySelector('.setup-similar');
    if (setupSimilarSection) {
      setupSimilarSection.classList.remove('hidden');
    }

    document.addEventListener('keydown', modalEscPressListener);
    setupModal.classList.remove('hidden');

    if (wizardCoatElement) {
      wizardCoatElement.addEventListener('click', wizardCoatElementClickHandler);
    }
    if (wizardEyesElement) {
      wizardEyesElement.addEventListener('click', wizardEyesElementClickHandler);
    }
    if (fireballElement) {
      fireballElement.addEventListener('click', fireballElementClickHandler);
    }
  };

  setupOpenButton.addEventListener('click', showSetupModal);
  setupOpenButton.addEventListener('keydown', generateKeyEventListener(ENTER_KEYCODE, showSetupModal));
  setupCloseButton.addEventListener('click', closeSetupModal);
  setupCloseButton.addEventListener('keydown', generateKeyEventListener(ENTER_KEYCODE, closeSetupModal));
}
