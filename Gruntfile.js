module.exports = function(grunt) {

  function creditsBanner() {
    var d = new Date(),
      local = d.toLocaleDateString();

    return ('/* \n' +
        ' * Vincent Orback \n' +
        ' * \n' +
        ' * http://vincentorback.se/ \n' +
        ' * https://github.com/vincentorback/Vincent-Orback \n' +
        ' * \n' +
        ' * Latest build: ' + local + '\n' +
        '*/ ');
  }

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: 'true',
          noCache: true,
          banner: creditsBanner()
        },
        files: {
          'style.css': 'sass/style.scss'
        }
      }
    },
		jshint: {
      options: {
        ignores: [
          'js/vendor/*.js',
          'js/*-min.js',
        ],
        browser: true,
        strict: false,
        eqeqeq: true,
        indent: 2,
        newcap: true,
        plusplus: true,
        unused: true,
        trailing: true,
        loopfunc: false,
        nomen: true,
        onevar: true,
        white: true,
        undef: true,
        latedef: true,
        globals: {
          jQuery: true,
          $: true
        }
      },
      src: ['js/main2.js', 'js/xmas.js']
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'images/',
            src: ['**/*.png'],
            dest: 'images/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
            progressive: true
        },
        files: [
            {
              expand: true,
              cwd: 'images/',
              src: ['**/*.jpg'],
              dest: 'images/',
              ext: '.jpg'
            }
        ]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {                     // Target
        files: [{               // Dictionary of files
          expand: true,       // Enable dynamic expansion.
          cwd: 'images/',     // Src matches are relative to this path.
          src: ['**/*.svg'],  // Actual pattern(s) to match.
          dest: 'images/',       // Destination path prefix.
        }]
      }
    },
		uglify: {
			options: {
				banner: creditsBanner(),
        report: 'gzip'
			},
			my_target: {
				files: {
          'js/main-min.js': ['js/vendor/modernizr.js', 'js/vendor/lazyload.js', 'js/main2.js', 'js/xmas.js']
				}
			}
		},
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['*.html']
      }
    }
	});

  require('load-grunt-tasks')(grunt, {scope: ['devDependencies']});

	grunt.registerTask('default', ['sass', 'jshint', 'uglify']);
};