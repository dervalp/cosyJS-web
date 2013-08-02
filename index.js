var cosy = require( "cosy-core" ),
    AppServer = require( "./lib/server/application" ),
    StaticServer = require( "./lib/server/static" );

module.exports = function( app, conf ) {
    return {
        start: function( cb ) {
            cosy.start( conf, function( err, API ) {
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