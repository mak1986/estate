/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

import template from './pagination.html';

PaginationController.$inject = [];

function PaginationController() {

    /**
     * Private properties
     */

    let vm = this;

    /**
     * Public properties
     */

    vm.limit = 0;
    vm.currentPage = 1;
    vm.lastPage = 1;

    /**
     * Public method mappings
     */

    vm.setCurrentPage = setCurrentPage;

    /**
     * Life cycle hooks
     */

    vm.$onChanges = (changesObj)=>{
        if(changesObj.list && changesObj.list.currentValue){

            let totalPages = Math.ceil(changesObj.list.currentValue.length / vm.limit);

            vm.currentPage = 1;

            vm.lastPage = totalPages === 0? 1: totalPages;

            createPaginationList();
        }
    }

    /**
     * Public methods
     */

    function setCurrentPage(page) {
        if(page > 0 && page < vm.lastPage+1) {
            vm.currentPage = page;
            createPaginationList();
        }
    }

    /**
     * Private methods
     */

    function createPaginationList(){
        let startIndex = (vm.currentPage-1) * vm.limit;
        let paginationList = angular.copy(vm.list).splice(startIndex, vm.limit);
        vm.onPageChanged({paginationList: paginationList});
    }

}

export default {
    bindings: {
        limit: '<',
        list: '<',
        onPageChanged: '&'
    },
    template: template,
    controller: PaginationController,
    controllerAs: 'Ctrl'
};