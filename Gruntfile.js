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
                dest: 'dist/<%= pkg.buildName %>.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {flatten: true, src: ['module/ngObelisk.js'], dest: 'dist/snapshot.js'}
                ]
            }
        },
        rename: {
            main: {
                files: [
                    {src: ['dist/ng-obelisk.js'], dest: 'dist/<%= pkg.buildName %>.js'}
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/*.js']
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
