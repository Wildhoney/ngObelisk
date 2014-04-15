module.exports = function(grunt) {

    grunt.initConfig({

        /**
         * @property pkg
         * @type {Object}
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * @property jshint
         * @type {Object}
         */
        jshint: {
            all: 'module/ngObelisk.js',
            options: {
                jshintrc: '.jshintrc'
            }
        },

        /**
         * @property uglify
         * @type {Object}
         */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['module/ngObelisk.js'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        /**
         * @property copy
         * @type {Object}
         */
        copy: {
            main: {
                files: [
                    {flatten: true, src: ['module/ngObelisk.js'], dest: 'dist/ng-obelisk.js'}
                ]
            },
            test: {
                src: 'module/ngObelisk.js',
                dest: 'example/js/ng-obelisk.js'
            }
        },

        /**
         * @property rename
         * @type {Object}
         */
        rename: {
            main: {
                files: [
                    {src: ['dist/ng-obelisk.js'], dest: 'dist/<%= pkg.name %>.js'}
                ]
            }
        },

        /**
         * @property compress
         * @type {Object}
         */
        compress: {
            main: {
                options: {
                    archive: 'releases/<%= pkg.version %>.zip'
                },
                files: [
                    { flatten: true, src: ['dist/**'], dest: 'releases/', filter: 'isFile' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('build', ['copy', 'uglify', 'compress']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'copy', 'uglify', 'compress']);

};
