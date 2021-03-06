'use strict';

const args = require('../../src/args');
const init = require('../../src/init');

module.exports.command = 'init';

module.exports.describe = 'initialize a blueprint';

module.exports.builder = {
  blueprint: args['blueprint'],
  to: args['to'],
  resolveConflicts: args['resolve-conflicts'],
  outputRepo: args['output-repo'],
  codemodsSource: args['codemods-source']
};

module.exports.handler = async function handler(argv) {
  try {
    let result = await init({
      ...argv,
      blueprintOptions: argv._.slice(1)
    });

    let ps = result.resolveConflictsProcess;
    if (ps) {
      process.stdin.pipe(ps.stdin);
      ps.stdout.pipe(process.stdout);
      ps.stderr.pipe(process.stderr);
    }

    let message = await result.promise;
    if (message) {
      console.log(message);
    }

    // since we are piping, not inheriting, the child process
    // doesn't have the power to close its parent
    if (ps) {
      // eslint-disable-next-line no-process-exit
      process.exit();
    }
  } catch (err) {
    console.error(err);
  }
};
