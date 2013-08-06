var path = require( "path" ),
    cosy = require( "cosy-core" ),
    defaults = require( "./lib/utils/utils" ).defaults,
    AppServer = require( "./lib/server/application" ),
    StaticServer = require( "./lib/server/static" );

//create default for configuration
var defaultConfiguration = {
    pages: path.normalize( process.cwd( ) + "/content/pages/" ),
    grids: path.normalize( process.cwd( ) + "/content/grids/" ),
    layouts: path.normalize( process.cwd( ) + "/content/layouts/" ),
    middlewares: path.normalize( process.cwd( ) + "/content/middlewares/" ),
    controllers: path.normalize( process.cwd( ) + "/content/controllers/" )
};

module.exports = function( app, conf ) {

    var configuration = defaults( defaultConfiguration, conf );

    return {
        start: function( cb ) {
            cosy.start( configuration, function( err, API ) {
                if ( err ) {
                    console.log( err );
                    throw new Error( err );
                }

                var appServer = AppServer( API );
                var staticServer = StaticServer( API );

                appServer.setup( app );
                staticServer.setup( app );
                cb( );
            } );
        }
    };
};