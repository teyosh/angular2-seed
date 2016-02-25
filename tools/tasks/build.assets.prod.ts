import {join} from 'path';
import {APP_DEST, TMP_SRC} from '../config';

export = function buildAssetsDev(gulp, plugins) {
  // TODO There should be more elegant to prevent empty directories from copying
  let es = require('event-stream');
  var onlyDirs = function (es) {
    return es.map(function (file, cb) {
      if (file.stat.isFile()) {
        return cb(null, file);
      } else {
        return cb();
      }
    });
  };
  return function () {
    return gulp.src([
        join(TMP_SRC, '**'),
        '!' + join(TMP_SRC, '**', '*.ts'),
        '!' + join(TMP_SRC, '**', '*.css'),
        '!' + join(TMP_SRC, '**', '*.scss'),
        '!' + join(TMP_SRC, '**', '*.html'),
      ])
      .pipe(onlyDirs(es))
      .pipe(gulp.dest(APP_DEST));
  };
}
