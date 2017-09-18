/*
|--------------------------------------------------------------------------
| Chamada
|--------------------------------------------------------------------------
*/

document.addEventListener('DOMContentLoaded', function() {

      APP.core.Main.init();

});

/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
*/

APP.core.Main = {

      init: function() {
          APP.controller.General.init();
          this.carregaPageController();

      },

      carregaPageController: function (){

            var controller = APP.component.Utils.getController();

            if (controller) {
                APP.controller[controller].init();
            }
      }

};
