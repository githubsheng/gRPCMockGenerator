/**
 * Created by wangsheng on 12/1/17.
 */
let gulp = require('gulp');
let webpack = require('webpack-stream');

gulp.task('packSourceCode', ['compileSourceCode'], function() {
    return gulp.src('client/js/main.js')
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('client/dist/'));
});

gulp.task('default', ['packSourceCode']);