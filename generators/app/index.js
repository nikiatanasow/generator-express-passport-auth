'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.generators.Base.extend({
    
    
    prompting: function () {
        var done = this.async();

         this.log(yosay());

        var promts = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter project name:',
                default: this.appname
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter project description:',
                default: this.appname
            },
            {
                type: 'input',
                name: 'dbName',
                message: 'Enter database name:',
                default: this.appname
            },
            {
                type: 'input',
                name: 'title',
                message: 'Enter page title:',
                default: this.appname
            },
        ];

        this.prompt(promts, function (answers) {
            this.props = answers
            this.log(answers.name);
            done();
        }.bind(this));
    },

    writing: {
        config: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name,
                    description: this.props.description
                }
                );

            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'), {
                    name: this.props.name,
                    description: this.props.description
                }
                );

            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
                );

            this.fs.copy(
                this.templatePath('./_public/_css/_app.css'),
                this.destinationPath('./public/css/app.css')
                );

            this.fs.copy(
                this.templatePath('_server.js'),
                this.destinationPath('server.js')
                );
            
            // config folder    
            this.fs.copy(
                this.templatePath('./_server/_config/_auth.js'),
                this.destinationPath('./server/config/auth.js')
                );

            this.fs.copyTpl(
                this.templatePath('./_server/_config/_config.js'),
                this.destinationPath('./server/config/config.js'), {
                    name: this.props.name,
                    dbName: this.props.dbName
                }
                );

            this.fs.copy(
                this.templatePath('./_server/_config/_express.js'),
                this.destinationPath('./server/config/express.js')
                );

            this.fs.copy(
                this.templatePath('./_server/_config/_mongoose.js'),
                this.destinationPath('./server/config/mongoose.js')
                );

            this.fs.copy(
                this.templatePath('./_server/_config/_passport.js'),
                this.destinationPath('./server/config/passport.js')
                );

            this.fs.copy(
                this.templatePath('./_server/_config/_routes.js'),
                this.destinationPath('./server/config/routes.js')
                );
            
            // controllers
            this.fs.copy(
                this.templatePath('./_server/_controllers/_index.js'),
                this.destinationPath('./server/controllers/index.js')
                );

            this.fs.copy(
                this.templatePath('./_server/_controllers/_usersController.js'),
                this.destinationPath('./server/controllers/usersController.js')
                ); 
            
            // data
            this.fs.copy(
                this.templatePath('./_server/_data/_Models/_User.js'),
                this.destinationPath('./server/data/Models/User.js')
                );

            this.fs.copy(
                this.templatePath('./_server/_data/_usersData.js'),
                this.destinationPath('./server/data/usersData.js')
                ); 
            
            // utilities 
            this.fs.copy(
                this.templatePath('./_server/_utilities/_cripto.js'),
                this.destinationPath('./server/utilities/cripto.js')
                ); 
            
            // views    
            this.fs.copy(
                this.templatePath('./_server/_views/_index.jade'),
                this.destinationPath('./server/views/index.jade')
                );

            this.fs.copyTpl(
                this.templatePath('./_server/_views/_shared/_layout.jade'),
                this.destinationPath('./server/views/shared/layout.jade'), {
                    title: this.props.title
                }
                );

            this.fs.copy(
                this.templatePath('./_server/_views/_shared/_scripts.jade'),
                this.destinationPath('./server/views/shared/scripts.jade')
                );

            this.fs.copy(
                this.templatePath('./_server/_views/_users/_login.jade'),
                this.destinationPath('./server/views/users/login.jade')
                );

            this.fs.copy(
                this.templatePath('./_server/_views/_users/_register.jade'),
                this.destinationPath('./server/views/users/register.jade')
                );

        }
    },

    install: function () {
        this.installDependencies();
    }
});