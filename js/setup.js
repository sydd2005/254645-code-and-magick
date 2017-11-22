'use strict';

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

var setupModal = document.querySelector('.setup');
if (setupModal) {
  setupModal.classList.remove('hidden');
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template');
if (similarWizardTemplate) {
  similarWizardTemplate = similarWizardTemplate.content.querySelector('.setup-similar-item');
}

var generateSimilarWizards = function (wizardsCount) {
  var similarWizards = [];

  for (var i = 0; i < wizardsCount; i++) {
    similarWizards[i] = {
      name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)],
      coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      eyesColor: EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)],
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
    wizardsFragment.appendChild(createWizardElement(wizards[i], similarWizardTemplate));
  }

  return wizardsFragment;
};

var similarListElement = setupModal.querySelector('.setup-similar-list');
if (similarListElement) {
  var similarWizards = generateSimilarWizards(4);
  var similarWizardsFragment = createSimilarWizardsFragment(similarWizards);
  similarListElement.appendChild(similarWizardsFragment);
}

var setupSimilarSection = setupModal.querySelector('.setup-similar');
if (setupSimilarSection) {
  setupSimilarSection.classList.remove('hidden');
}
