const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');
const browserSync = require('browser-sync');

// Компиляции Pug файлов
gulp.task('compile-pug', function () {
	return gulp
		.src('./src/pug/*.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('./dist'));
});

// Компиляции SCSS файлов
gulp.task('compile-sass', function () {
	return gulp
		.src('./src/scss/*.+(scss|sass)')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'));
});

// Копирование JavaScript файлов
gulp.task('copy-js', function () {
	return gulp.src('./src/js/*.js').pipe(gulp.dest('./dist/js'));
});

// Копирование изображений
gulp.task('copy-images', function () {
	return gulp.src('./src/assets/images/**/*').pipe(gulp.dest('./dist/images'));
});

// Копирование шрифтов
gulp.task('copy-fonts', function () {
	return gulp.src('./src/assets/fonts/*').pipe(gulp.dest('./dist/fonts'));
});

// BrowserSync
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './dist', // Путь к корневой директории сервера
		},
	});
});

// Отслеживание изменений в папке src
gulp.task('watch', function () {
	watch('./src/pug/*.pug', gulp.series('compile-pug', browserSync.reload));
	watch(
		'./src/scss/*.+(scss|sass)',
		gulp.series('compile-sass', browserSync.reload),
	);
	watch('./src/js/*.js', gulp.series('copy-js', browserSync.reload));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
gulp.task(
	'build',
	gulp.parallel(
		'compile-pug',
		'compile-sass',
		'copy-js',
		'copy-images',
		'copy-fonts',
	),
);