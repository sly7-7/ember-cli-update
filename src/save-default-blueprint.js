'use strict';

const path = require('path');
const getProjectOptions = require('./get-project-options');
const getPackageVersion = require('./get-package-version');
const getProjectVersion = require('./get-project-version');
const utils = require('./utils');

async function saveDefaultBlueprint({
  cwd,
  blueprint: { name }
}) {
  let packageJson = utils.require(path.join(cwd, 'package'));

  let projectOptions = await getProjectOptions(packageJson);

  let packageName = 'ember-cli';
  let packageVersion = getPackageVersion(packageJson, packageName);

  let versions = await utils.getVersions(packageName);

  let version = getProjectVersion(packageVersion, versions, projectOptions);

  await utils.saveBlueprint({
    cwd,
    name,
    version
  });
}

module.exports = saveDefaultBlueprint;