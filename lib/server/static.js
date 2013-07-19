var fs = require( "fs" ),
    boot = require( "cosy-boot" );
/**
 * staticServer register the root in order to server all the component within a page
 */
module.exports = function( cosy ) {
    var cache = {},
        templateCache = {},
        cosy = cosy;

    return {
        configure: function( app ) {

            app.get( "/cosy/load/comp", function( req, res ) {
                var param = req.query[ "mod" ],
                    result = [ ],
                    params = param.substring( 1, ( param.length - 1 ) ).split( "," );

                if ( cache[ param ] ) {
                    return res.send( cache[ param ] );
                } else {
                    params.forEach( function( param ) {
                        var s = cosy.getScript( param );
                        if ( !s ) {
                            result.push( s );
                        }
                    } );
                    return res.send( s.join( " " ) );
                }
            } );

            app.get( "/cosy/c.js", function( req, res ) {
                res.send( boot );
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