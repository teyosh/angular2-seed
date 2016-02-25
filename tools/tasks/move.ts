import {join} from 'path';
import {APP_SRC, TMP_SRC} from '../config';

export = function move(gulp, pligins) {
  return function () {
    return gulp.src(join(APP_SRC, '**'))
      .pipe(gulp.dest(TMP_SRC));
  };
};
