import {join} from 'path';
import {TMP_DIR, TMP_SRC} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

const INLINE_OPTIONS = {
  base: TMP_DIR ,
  useRelativePaths: true,
  removeLineBreaks: true
};

export = function buildJSProd(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/browser.d.ts',
      'tools/manual_typings/**/*.d.ts',
      join(TMP_SRC, '**/*.ts'),
      '!' + join(TMP_SRC, '**/*.spec.ts'),
      '!' + join(TMP_SRC, '**/*.e2e.ts')
    ];
    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TMP_DIR));
  };
};
