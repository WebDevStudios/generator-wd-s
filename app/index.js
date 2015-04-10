'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log( yosay( 'Welcome to the fantastic ' + chalk.red('wds_s') + ' generator!' ));

    var prompts = [
      {
        type: 'input',
        name: 'themename',
        message: 'What is your project name?',
        default: this.appname
      },
       {
        type: 'input',
        name: 'shortname',
        message: 'What project prefix should be used?',
        default: this.appname
      },
      {
        name: 'themeuri',
        message: 'What is the URI of your theme?',
        default: 'http://webdevstudios.com'
      },
      {
        name: 'author',
        message: 'What is the Author name?',
        default: 'WebDevStudios'
      },
      {
        name: 'authoruri',
        message: 'What is the Author URI?',
        default: 'http://webdevstudios.com/'
      },
      {
        name: 'descrip',
        message: 'What is the theme description:',
        default: 'A starter theme based on wd_s'
      },
    ];

      this.prompt( prompts, function ( props ) {
        //Clean up passed in variables
        this.themename = props.themename;
        this.shortname = props.shortname;
        this.themeuri  = props.themeuri;
        this.author    = props.author;
        this.authoruri = props.authoruri;
        this.descrip   = props.descrip;
        done();
      }.bind(this));
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('src/*'),
        this.destinationPath('/')
      );
  },

  install: function () {
    this.installDependencies();
  }
});
