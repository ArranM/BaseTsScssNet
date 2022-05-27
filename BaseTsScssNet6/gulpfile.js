const gulp = require('gulp');
const { src, series, dest, watch, task, parallel } = gulp;

const shell = require('gulp-shell');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const isDev = () => {
    return !!process.argv.find(el => el === '--config-dev');
};


task('scss', () => {
    return src('src/assets/scss/**/*.scss')
        .pipe(gulpif(isDev(), sourcemaps.init()))
        .pipe(
            gulpif(
                isDev(),
                sass().on('error', sass.logError),
                sass({ outputStyle: 'compressed' }).on('error', sass.logError)
            )
        )
        .pipe(gulpif(isDev(), sourcemaps.write('.')))
        .pipe(dest('wwwroot/assets/css'));
});

task('scss:watch', () => {
    watch('src/assets/scss/**/*.scss', series(['scss']));
});

task('public:clean', shell.task('npx rimraf wwwroot/assets'));

task('ts:compile', gulpif(
    isDev(),
    shell.task('npx rollup --config rollup.config.js --config-dev'),
    shell.task('npx rollup --config rollup.config.js')
));

task('ts:watch', shell.task('npx rollup --config rollup.config.js --config-dev --watch'));

task('build', series(['public:clean', 'ts:compile', 'scss']));
task('dev', series([
    'public:clean',
    parallel([
        'scss',
        'ts:compile'
    ]),
    parallel([
        'ts:watch',
        'scss:watch'
    ])
]));