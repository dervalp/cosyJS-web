var PageBuilder = require( "cosy-core" ).Page;

module.exports = function( cosy ) {

    var buildPage = function( req, route, callback ) {
        var config = cosy.getConfig( route ),
            placholders = cosy.getStructure( config.grid ),
            layout = cosy.getLayout( config.layout );

        var current = new PageBuilder( cosy._c, cosy.grid, placholders, layout, config, req.scope );

        current.initialized( req, function( ) {
            current.render( function( content ) {
                callback( content );
            } );
        } );
    };

    var buildWebServer = function( app ) {
        cosy.getPages( ).forEach( function( page ) {
            var route = page.route,
                middlewares = cosy.getMiddlewares( page.middlewares ),
                customCallback = function( req, res ) {
                    buildPage( req.scope, route, function( content ) {
                        res.send( content );
                    } );
                };

            route = page.subdomain ? "/" + page.subdomain + route : route;

            if ( middlewares ) {
                app.get( route, middlewares, customCallback );
            } else {
                app.get( route, customCallback );
            }
        } );
    };

    return {
        setup: buildWebServer
    };
};