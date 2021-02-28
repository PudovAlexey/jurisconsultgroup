const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
// const webpackConfig = require('./webpack.config.js');
// const mapboxgl = require('mapbox-gl')
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');

let webConfig = {
    watch: true,
    output: {
        filename: 'main.min2.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env'],
                        plugins: ['babel-plugin-root-import']
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
            }),
          ],
          mode: "production",
};

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function html() {
    return src('app/pages/**/*.html')
    .pipe(fileinclude())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function styles() {
    return src([
        'node_modules/js-plugin-circliful/dist/main.css',
        'node_modules/mapbox-gl/dist/mapbox-gl.css',
        'app/scss/style.scss'
    ])
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
            // 'node_modules/jquery/dist/jquery.js',
            'node_modules/slick-carousel/slick/slick.min.js',
            // 'node_modules/mapbox-gl/dist/mapbox-gl.js',
            'app/js/main.js'
        ])
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        // .pipe(concat('main.min.js'))
        // .pipe(uglify())
        .pipe(webpackStream(webConfig))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function build() {
    return src([
            'app/**/*.html',
            'app/telegram.php',
            'app/css/style.min.css',
            'app/js/main.min2.js'
        ], { base: 'app' })
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', `!app/js/main.min2.js`], scripts);
    watch((['app/**/*.html'])).on('change', browserSync.reload);
}


exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);


exports.default = parallel(html, styles, scripts, browsersync, watching);