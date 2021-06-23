// * Команды *
// "gulp" - запуск gulp.
// "gulp mg" - группировка всех медиазапросов в конец файла style.css.
// "gulp min" - сжимает js, css (создает минимизированные файлы script.min.js и style.min.css).
// "gulp img-min" - сжимает изображения

// * Настройки *
const preprocessor        = 'scss', // Выбрать препроцессор для стилей (scss или less)
      gulpVersion         = '4'; // Версия галпа (3 или 4)

// * Пути к папкам относительно корня проекта *
const scssPath            = 'scss', // Scss
      lessPath            = 'less', // Less
      cssPath             = 'dist/css', // Css
      pugPath             = 'pug', // Pug
      htmlPath            = 'dist', // Html
      jsAppPath           = 'js-app', // Js до сборки
      jsPath              = 'dist/js', // Js после сборки
      imgPath             = 'dist/img'; // Изображения



// Код
const gulp                = require('gulp'),
      sass                = require('gulp-sass'),
      less                = require('gulp-less'),
      concatJS            = require('gulp-concat'),
      pug                 = require('gulp-pug'),
      autoprefixer        = require('gulp-autoprefixer'),
      cleanCSS            = require('gulp-clean-css'),
      rigger              = require('gulp-rigger'),
      browserSync         = require('browser-sync'),
      uglify              = require('gulp-uglify'),
      rename              = require("gulp-rename"),
      gcmq                = require('gulp-group-css-media-queries'),
      imageMin            = require('gulp-imagemin'),
      pngquant            = require('imagemin-pngquant'),
      plumber             = require('gulp-plumber');

gulp.task('pug', function buildHTML() {
  return gulp.src( pugPath + '/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: '\t'
    }))
    .pipe(gulp.dest( htmlPath ))
    .pipe(browserSync.reload({stream:true}));
});

if (preprocessor == 'scss') {
  gulp.task('style', function () {
    return gulp.src( scssPath + '/style.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest( cssPath ))
    .pipe(browserSync.reload({stream:true}));
  });
}

else if (preprocessor == 'less') {
  gulp.task('style', function () {
    return gulp.src( lessPath + '/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest( cssPath ))
    .pipe(browserSync.reload({stream:true}));
  });
}

gulp.task('js', function () {
    return gulp.src( jsAppPath + '/scripts.js')
    .pipe(rigger())
    .pipe(gulp.dest( jsPath ))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: htmlPath
        },
        notify: true
    });
});

gulp.task('css-min', function () {
  return gulp.src( cssPath + '/style.css')
  .pipe(cleanCSS({
    level : 2
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest( cssPath ))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-min', function () {
  return gulp.src( jsPath + '/scripts.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest( jsPath ))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('img-min', function () {
  return gulp.src(imgPath + '/**/*' )
    .pipe(imageMin([
      imageMin.gifsicle(),
      imageMin.mozjpeg(),
      imageMin.svgo(),
      pngquant()
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(imgPath + '/min'));
});

gulp.task('media-group', function () {
    return gulp.src( cssPath + '/style.css')
    .pipe(gcmq())
    .pipe(gulp.dest( cssPath ))
    .pipe(browserSync.reload({stream: true}));
});

if (gulpVersion == '3') {
  gulp.task('watch', function () {
    gulp.watch('pug/**/*.pug', ['pug']);
    gulp.watch('js-app/**/*.js', ['js']);
    gulp.watch('scss/**/*.scss', ['style']);
  });

  gulp.task('default', ['browser-sync', 'pug', 'style', 'watch']);

  gulp.task('minify', ['css-min', 'js-min']);

  gulp.task('mg', ['media-group']);
}
else if (gulpVersion == '4') {
  gulp.task('watch', function () {
    gulp.watch('pug/**/*.pug', gulp.parallel('pug'));
    gulp.watch('js-app/**/*.js', gulp.parallel('js'));
    gulp.watch('scss/**/*.scss', gulp.parallel('style'));
  });

  gulp.task('default', gulp.parallel('browser-sync', 'pug', 'style', 'watch'));

  gulp.task('min', gulp.parallel('css-min', 'js-min'));

  gulp.task('mg', gulp.parallel('media-group'));
}