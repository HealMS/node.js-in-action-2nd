//先全局安装gulp-cli
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
/**
 * 这里babel react env的大版本需要一致
 * 7.x版本的babel 名称都是@babel/preset-xx
 * 6.x版本的babel 名称都是babel-preset-xx
 */
gulp.task('default', () => {
    return gulp.src('app/*.jsx')    //需要处理的所有文件
        .pipe(sourcemaps.init())    //配置
        .pipe(babel({               //编译es6和react
            'presets': ['@babel/react', '@babel/env']
        })).pipe(concat('all.js'))  //将所有源码都拼到all.js文件中
        .pipe(sourcemaps.write())   //写
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    watch('app/*.jsx', () => gulp.start('default'));
});