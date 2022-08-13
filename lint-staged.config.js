module.exports = {
  "*.{js,ts}": ["eslint --config eslint.config.js --ext .js,.ts --cache --fix", "prettier --write"],
  "**/*.ts?(x)": () => "tsc --project tsconfig.json --noEmit",
  "*.{json,md,yml,html,css,scss}": "prettier --write",
};
