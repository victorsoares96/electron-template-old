const path = require('path');

module.exports = {
  '**/*.{ts,tsx}': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map((file) => path.relative(cwd, file));

    return [`prettier ${relativePaths.join(' ')} --write`, `eslint ${relativePaths.join(' ')} --fix`, 'tsc -p tsconfig.json --noEmit --pretty'];
  },
};
