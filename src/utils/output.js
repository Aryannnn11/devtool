import chalk from "chalk";

function success(message) {
  console.log(chalk.green(`✓ ${message}`));
}

function error(message) {
  console.log(chalk.red(`✗ ${message}`));
}

function info(message) {
  console.log(chalk.blue(message));
}

export {
  success,
  error,
  info
};