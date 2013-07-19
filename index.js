var cosy = require( "cosy-core" );

module.exports = function( app, conf ) {
    start: function( cb ) {
        cosy.start( conf, function( API ) {
            appServer = require( "./server/application" )( API );
            staticServer = require( "./server/static" )( API );

            appServer.setup( app );
            staticServer.setup( app );
            cb( );
        } );
    }
};