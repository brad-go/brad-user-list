const path = require('path');

const buildESLintCommand = (filenames) =>
  `yarn lint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const buildPrettierCommand = (filenames) =>
  `yarn prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '**/*.(ts|tsx)': () => 'tsc --pretty --noEmit',
  '**/*.(ts|tsx|js)': [buildESLintCommand, buildPrettierCommand],
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
