'use strict';


module.exports = function watch(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Options
    return {
        watch: {
            files: [
                'src/**/*.js',
                'test/**/*.js',
                'controllers/**/*.js',
                'models/**/*.js',
                'locales/**/*',
                'views/**/*'
            ],
            tasks: ['test'],
            options: {
                spawn: false
            }
        }
    };
};
