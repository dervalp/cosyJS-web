module.exports = {
    defaults: function( obj ) {
        Array.prototype.slice.call( arguments, 1 ).forEach( function( source ) {
            if ( source ) {
                for ( var prop in source ) {
                    if ( obj[ prop ] === void 0 ) obj[ prop ] = source[ prop ];
                }
            }
        } );
        return obj;
    }
};