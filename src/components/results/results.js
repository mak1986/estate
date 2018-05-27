/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

import template from './results.html';

ResultsController.$inject = [];

function ResultsController(){

    /**
     * Private properties
     */

    let vm = this;

    /**
     * Public properties
     */

    vm.loading = true;
    vm.paginationList = [];

    /**
     * Life cycle hooks
     */

    vm.$onChanges = (changesObj)=>{
        if(changesObj.results && changesObj.results.currentValue && changesObj.results.currentValue.length > 0){
            vm.loading = false;
        }
    }

    /**
     * Public method mappings
     */

    vm.setPaginationList = setPaginationList;

    /**
     * Public methods
     */

    function setPaginationList(paginationList){
        vm.paginationList = paginationList;
    }


}

export default {
    bindings: {
      results: '<'
    },
    template: template,
    controller: ResultsController,
    controllerAs: 'Ctrl'
}