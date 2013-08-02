var server = require( "../index" ),
    should = require( "should" );

var app = {
    get: function( ) {}
};

describe( "Given cosy web", function( ) {
    it( "should be defined", function( ) {
        server.should.exists;
    } );
    describe( "Given cosy web", function( ) {
        var cosy = server( app, {} );
        it( "should be defined", function( ) {
            cosy.should.exists;
        } );
        it( "start should be defined", function( ) {
            cosy.start.should.exists;
        } );
        it( "start should work", function( done ) {
            cosy.start( function( ) {
                done( );
            } );
        } );
    } );
} );