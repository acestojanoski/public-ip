const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rimraf = require('rimraf');
const {promisify} = require('util');

const rimrafAsync = promisify(rimraf);

const distDir = './public';
const uiDir = './ui';

const deleteDist = async (callback) => {
	await rimrafAsync(distDir);
	callback();
};

const uglifyScripts = () =>
	gulp.src(`${uiDir}/*.js`).pipe(uglify()).pipe(gulp.dest(distDir));

const cleanStyles = () =>
	gulp
		.src(`${uiDir}/*.css`)
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(distDir));

const moveFiles = () =>
	gulp
		.src(`${uiDir}/assets/*`)
		.pipe(gulp.dest(`${distDir}/assets`))
		.pipe(gulp.src(`${uiDir}/*.html`))
		.pipe(gulp.dest(distDir));

exports.default = gulp.series(
	deleteDist,
	gulp.parallel(uglifyScripts, cleanStyles, moveFiles)
);
