/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

import template from './result.html';

ResultController.$inject = [];

function ResultController(){

    let vm = this;

}

export default {
    bindings: {
      model: '<'
    },
    template: template,
    controller: ResultController,
    controllerAs: 'Ctrl'
}