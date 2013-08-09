var fs = require( "fs" ),
    client = require( "cosy-client" ),
    StaticServer = require( "cosy-core" ).Static;
/**
 * staticServer register the root in order to server all the component within a page
 */
module.exports = function( cosy ) {
    var cache = {},
        templateCache = {},
        staticServer = new StaticServer( cosy );

    return {
        setup: function( app ) {

            app.get( "/cosy/load/comp.js", function( req, res ) {
                var param = req.query[ "mod" ],
                    result = [ ],
                    params = param.substring( 1, ( param.length - 1 ) ).split( "," );

                if ( cache[ param ] ) {
                    return res.send( cache[ param ] );
                } else {
                    return res.send( staticServer.components( params ) );
                }
            } );

            app.get( "/cosy/c.js", function( req, res ) {
                client.file( function( err, raw ) {
                    res.send( raw );
                } );
            } );

            app.get( "/cosy/template/:id", function( req, res ) {
                var result,
                    compName = req.params.id,
                    cache = templateCache[ compName ];

                result = cache ? cache : cosy.getTemplate( compName );

                return res.send( result );
            } );

        }
    };
};