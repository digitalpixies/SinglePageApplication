'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            express: {
                files: ['express/{,*/}*.js'],
                tasks: ['express:server'],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            options: {
                harmony: true, //needed because smtp-server is using spread operator
                port: 3080
            },
            server: {
                options: {
                    script: 'express/bin/www'
                }
            }
        },
        concurrent: {
            serve: {
                tasks: ['serve-yeoman', 'serve-express'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        copy: {
            YeomanToExpress: {
                expand: true,
                cwd: 'yeoman/dist/',
                src: '**',
                dest: 'express/public'
            },
            YeomanToProd: {
                expand: true,
                cwd: 'yeoman/dist/',
                src: '**',
                dest: 'public_html'
            }
        },
        ngconstant: {
            options: {
                name: 'yeomanApp',
                dest: 'yeoman/app/scripts/appconfig.js',
                deps: false
            },
            'from-yeoman': {
                options: {},
                values: {
                    debug: true
                },
                constants: {
                    AppConfig: grunt.file.readJSON('appconfig.from-yeoman.json')
                }
            },
            express: {
                options: {},
                constants: {
                    AppConfig: grunt.file.readJSON('appconfig.express.json')
                }
            },
            production: {
                options: {},
                constants: {
                    AppConfig: grunt.file.readJSON('appconfig.production.json')
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve-yeoman', function() {
        var cb = this.async();
        grunt.util.spawn({
            grunt: true,
            args: ['serve'], //, 'anyothercommand'],
            opts: {
                cwd: 'yeoman'
            }
        }, function(error, result, code) {
            console.log(result.stdout);
            cb();
        });
    });

    grunt.registerTask('build-yeoman', function() {
        var cb = this.async();
        grunt.util.spawn({
            grunt: true,
            args: ['build'], //, 'anyothercommand'],
            opts: {
                cwd: 'yeoman'
            }
        }, function(error, result, code) {
            console.log(result.stdout);
            cb();
        });
    });

    grunt.registerTask('serve-express', ['express:server', 'watch']);

    grunt.registerTask('serve', ['ngconstant:express', 'build-yeoman', 'copy:YeomanToExpress', 'serve-express']);

    grunt.registerTask('serve-from-yeoman', ['ngconstant:from-yeoman', 'concurrent:serve']);

    grunt.registerTask('build' ['ngconstant:production', 'build-yeoman', 'copy:YeomanToProd']);
};
