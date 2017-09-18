/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/

APP.component.Utils = {

    init : function () {

        this.getController();

    },

    getController: function () {

        var controller = $('meta[name=controller]').attr("content");
        return controller ? controller : false;

    }

};
