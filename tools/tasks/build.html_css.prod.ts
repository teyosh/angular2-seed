import * as merge from 'merge-stream';
import {join} from 'path';
import {
  TMP_SRC,
  TMP_DIR,
  PROD_DEPENDENCIES,
  CSS_PROD_BUNDLE,
  CSS_DEST
} from '../config';

export = function buildJSDev(gulp, plugins) {
  return function () {

    return merge(minifyComponentCss(), prepareTemplates(), processExternalCss());

    function prepareTemplates() {
      return gulp.src(join(TMP_SRC, '**', '*.html'))
        .pipe(gulp.dest(TMP_DIR));
    }

    function minifyComponentCss() {
      return gulp.src([
          join(TMP_SRC, '**', '*.css'),
          '!' + join(TMP_SRC, 'assets', '**', '*.css')
        ])
        .pipe(plugins.cssnano())
        .pipe(gulp.dest(TMP_DIR));
    }

    function processExternalCss() {
      return gulp.src(getExternalCss().map(r => r.src))
        .pipe(plugins.cssnano())
        .pipe(plugins.concat(CSS_PROD_BUNDLE))
        .pipe(gulp.dest(CSS_DEST));
    }

    function getExternalCss() {
      return PROD_DEPENDENCIES.filter(d => /\.css$/.test(d.src));
    }
  };
};
