/**
 * ------------------------------------------------
 * Gulp Build System
 * ------------------------------------------------
 * @author - Jorden Powley
 * @desc - Basic Gulp build system
 * ------------------------------------------------
 */

/**
 * Import required Gulp packages
 */
var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

/**
 * @desc - Development SCSS file location
 */
const devSCSSLocation = "dev/css/*.scss";

/**
 * @desc - Development JS file location
 */
const devJSLocation = "dev/js/*.js";

/**
 * @desc - Development React JS file location
 */
const devReactJSLocation = "dev/js/*_react.js";

/**
 * @desc - Public SCSS file location
 */
const publicSCSSLocation = "public/css";

/**
 * @desc - Public SCSS file location
 */
const publicJSLocation = "public/js";

/**
 * @desc - Main SCSS files for compiling
 */
const devSCSSFiles = ["dev/css/app.scss"];

/**
 * compileSCSS()
 * @desc - Takes all SCSS files from the development
 *         folder, processes them and saves them 
 *         within the public CSS folder
 */
function compileSCSS(){
    return(
        gulp.src(devSCSSFiles)                   // Load in the files from dev
            .pipe(sass())                           // Compile the SCSS to CSS
            .on("error", sass.logError)             // Allow error reporting
            .pipe(autoPrefixer())                   // Auto prefix vender css
            .pipe(minifyCSS())                      // Minify the CSS
            .pipe(gulp.dest(publicSCSSLocation))    // Save to the output location
    );
} // END compileSCSS()

/**
 * compileJS()
 * @desc - Takes all JS files from the development
 *         folder, processes them and saves them
 *         within the public JS folder
 */
function compileJS(){
    return(
        gulp.src(devJSLocation)                     // Load in the files from dev
            .pipe(uglify())                         // Uglify the JS
            .pipe(minify())                         // Minify the JS
            .pipe(gulp.dest(publicJSLocation))      // Save to the output location
    );
} // END compileJS()

/**
 * compileBabel()
 * @desc - Compiles JS files with Babel for usage in
 *         React
 */
function compileBabel(){
    return(
        gulp.src(devReactJSLocation)
            .pipe(babel())                          // Compile the Babel
            .pipe(uglify())                         // Uglify the JS
            .pipe(minify())                         // Minify the JS
            .pipe(gulp.dest(publicJSLocation))
    );
} // END compileBabel()

/**
 * watch()
 * @desc - Watches various dev folders and runs
 *         Gulp tasks on file saves
 */
function watch(){
    // Follow the SCSS folder
    gulp.watch(devSCSSLocation, compileSCSS);

    // Follow the JS folder for Babel compilation
    gulp.watch(devReactJSLocation, compileBabel);
} // END watch()

/**
 * build()
 * @desc - Runs all required build tasks
 */
function build(done){
    compileSCSS();
    compileBabel();
    done();
} // END build()

/**
 * ------------------------------------------------
 * Gulp Export Tasks
 * ------------------------------------------------
 */

/**
 * @desc - Export the compileSCSS function to the 
 *         command line
 */
exports.compileSCSS = compileSCSS;

/**
 * @desc - Export the compileJS function to the 
 *         command line
 */
exports.compileJS = compileJS;

/**
 * @desc - Export the watch function to the 
 *         command line
 */
exports.watch = watch;

/**
 * @desc - Export the build function to the
 *         command line
 */
exports.build = build;