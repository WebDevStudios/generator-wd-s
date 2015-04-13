'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.option('noprompt', {
      desc: 'Don\'t prompt for options',
      type: 'Boolean',
      defaults: false
    });

    this.option('dir', {
      desc: 'Directory to install to',
      type: 'String',
      defaults: '.'
    });

    this.option('themename', {
      desc: 'Project name',
      type: 'String',
      default: 'Theme Name'
    });
    this.themename = this.options.themename;

    this.option('shortname', {
      desc: 'Project slug',
      type: 'String',
      default: ''
    });
    this.shortname = _.kebabCase( this.options.shortname ) || _.kebabCase( this.themename );

    this.option('themeuri', {
      desc: 'URI of theme site',
      type: 'String',
      default: 'http://webdevstudios.com'
    });
    this.themeuri = this.options.themeuri;

    this.option('author', {
      desc: 'Author name',
      type: 'String',
      default: 'WebDevStudios'
    });
    this.author = this.options.author;

    this.option('authoruri', {
      desc: 'Author URI',
      type: 'String',
      default: 'http://webdevstudios.com'
    });
    this.authoruri = this.options.authoruri;

    this.option('descrip', {
      desc: 'Project name',
      type: 'String',
      default: 'A starter theme based on wd_s'
    });
    this.descrip = this.options.descrip;

    this.prefixname = _.snakeCase( this.shortname );
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    if ( this.options.noprompt ) {
      return;
    }

    var done = this.async();

    // Have Yeoman greet the user.
    this.log( yosay( 'Welcome to the fantastic ' + chalk.red('wds_s') + ' generator!' ));

    var prompts = [
      {
        type: 'input',
        name: 'themename',
        message: 'What is your project name?',
        default: this.themename || 'Theme Name'
      },
       {
        type: 'input',
        name: 'shortname',
        message: 'What project prefix should be used?',
        default: function( prompts ) {
          return _.kebabCase( prompts.themename );
        }
      },
      {
        name: 'themeuri',
        message: 'What is the URI of your theme?',
        default: this.themeuri || 'http://webdevstudios.com'
      },
      {
        name: 'author',
        message: 'What is the Author name?',
        default: this.author || 'WebDevStudios'
      },
      {
        name: 'authoruri',
        message: 'What is the Author URI?',
        default: this.authoruri || 'http://webdevstudios.com/'
      },
      {
        name: 'descrip',
        message: 'What is the theme description:',
        default: this.descrip || 'A starter theme based on wd_s'
      },
    ];

    this.prompt( prompts, function ( props ) {
      //Clean up passed in variables
      this.themename  = props.themename;
      this.shortname  = props.shortname;
      this.themeuri   = props.themeuri;
      this.author     = props.author;
      this.authoruri  = props.authoruri;
      this.descrip    = props.descrip;
      this.prefixname = _.snakeCase( this.shortname );
      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.destinationRoot( this.options.dir );

    this.fs.copyTpl(
      this.templatePath('src/*'),
      this.destinationPath('/'),
      this
    );
  },

  install: function () {
    this.installDependencies();
  }
});
