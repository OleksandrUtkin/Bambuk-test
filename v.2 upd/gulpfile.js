const gulp        = require("gulp");
const concat      = require('gulp-concat');
const sass        = require("gulp-sass");
const autoprefixer= require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const babel       = require('gulp-babel');
const browserSync = require('browser-sync').create();
const notify      = require("gulp-notify");
const minify      = require('gulp-minify');

// структура
// gulp.task('mytask', function(){
// 	return gulp.src('some-files')
// 	.pipe(plugin())
// 	.pipe(gulp.dest('some-folder'))
// });

gulp.task('scss', function(){
	return gulp.src('app/scss/*.scss')
	.pipe(sass())
	.on('error', notify.onError(function(err){
		return{
			title: 'Styles',
			message: err.message
		};
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

// gulp.task('fonts', function(){
// 	return gulp.src('app/css/fonts.css')
// 	.pipe(cleanCSS({
// 		level: 2
// 	}))
// 	.pipe(gulp.dest('app/dist css'))
// 	.pipe(browserSync.stream());
// })

gulp.task('styles', function() {
	return gulp.src(['app/css/style.css', 'app/css/media.css', 'app/css/fonts.css'])
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({
    	browsers: ['> 0.1%', "ie >= 9"],
    	cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest('app/dist css'))
	.pipe(browserSync.stream());
});

// gulp.task('scripts', function() {
// 	return gulp.src('app/js/*.js')
// 		.pipe(concat('script.min.js'))
// 		.pipe(babel({
// 			presets: ['@babel/env']
// 		}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./dist/js'))
// 		.pipe(browserSync.stream());
// });

// gulp.task('scripts', () => {
// 	return gulp.src('app/js/*.js')
// 		.pipe(babel({
// 			presets: ['@babel/env']
// 		}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./dist/js'))
// 		.pipe(browserSync.stream());
// });
gulp.task('scripts', function() {
	gulp.src('app/js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', gulp.parallel('browser-sync', 'scss', function(){
	gulp.watch('app/scss/*.scss', gulp.parallel('scss'));
	gulp.watch('app/css/*.css' , gulp.parallel('styles'));
	// gulp.watch('app/css/fonts.css', gulp.parallel('fonts'));
	gulp.watch('app/js/*.js', gulp.parallel('scripts'));
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);

}));