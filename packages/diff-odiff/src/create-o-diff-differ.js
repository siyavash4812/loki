const fs = require('fs-extra');
const { compare } = require('odiff-bin');

function createOdiffDiffer(config) {
  return function getImageDiff(path1, path2, diffPath, tolerance) {
    const instanceConfig = { threshold: tolerance, ...config };
    return new Promise(async (resolve, reject) => {
      const [reference, current] = (
        await Promise.all([fs.readFile(path1), fs.readFile(path2)])
      ).map(Buffer.from);

      if (current.equals(reference)) {
        return resolve(true);
      }
      if (reference.length === 0) {
        return reject(new Error('Reference image is empty'));
      }
      if (current.length === 0) {
        return reject(new Error('Current image is empty'));
      }
      const pathFinder = new RegExp(`(.*\/).*`);

      await fs.ensureDir(diffPath.match(pathFinder)[1]);

      compare(path1, path2, diffPath, instanceConfig)
        .then(({ match }) => resolve(match))
        .catch((error) => reject(error));
    });
  };
}

module.exports = createOdiffDiffer;
