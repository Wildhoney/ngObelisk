module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: 'module/ngObelisk.js',
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['module/ngObelisk.js'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
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
        rename: {
            main: {
                files: [
                    {src: ['dist/ng-obelisk.js'], dest: 'dist/<%= pkg.name %>.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['copy', 'uglify']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'copy', 'uglify']);

};
