/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

import _ from 'lodash';
import template from './search.html';

SearchController.$inject = [];

function SearchController(){

    /**
     * Private properties
     */

    let vm = this;

    /**
     * Public properties
     */

    vm.provinces = [];
    vm.searchCriteria = {
        sell: true,
        rent: true,
        province: false,
        realEstateType: false
    };

    /**
     * Public method mappings
     */

    vm.reset = reset;
    vm.search = search;

    /**
     * Life cycle hooks
     */

    vm.$onChanges = (changesObj)=>{
        if(changesObj.results && changesObj.results.currentValue){
            vm.provinces = _.uniq(_.map(changesObj.results.currentValue, 'province'));
        }
    }

    /**
     * Public methods
     */

    function reset() {
        vm.searchCriteria = {
            sell: true,
            rent: true,
            province: false,
            realEstateType: false
        };
    }

    function search() {
        let results = vm.results;
        results = filterByFreeText(results);
        results = filterByPrice(results);
        results = filterByAnnouncementType(results);
        results = filterByProvince(results);
        results = filterByRealEstateType(results);
        vm.onSearched({results: results});
    }

    function filterByFreeText(results) {
        return _.filter(results, (result)=>{
            let condition = true;
            if(vm.searchCriteria.freeText){
                condition = result.title.toLowerCase().indexOf(vm.searchCriteria.freeText) >= 0 || result.description.toLowerCase().indexOf(vm.searchCriteria.freeText) >= 0
            }
            return condition;
        });
    }

    function filterByPrice(results) {
        return _.filter(results, (result)=>{
            let condition = {from: true, to: true};
            if(vm.searchCriteria.priceFrom !== undefined){
                condition.from = result.price >= vm.searchCriteria.priceFrom;
            }
            if(vm.searchCriteria.priceTo !== undefined){
                condition.to = result.price <= vm.searchCriteria.priceTo;
             }

            return condition.from && condition.to;
        });
    }

    function filterByAnnouncementType(results) {
        return _.filter(results, (result)=>{
            return (result.announcement_type === 'ขาย' && vm.searchCriteria.sell) || (result.announcement_type === 'เช่า' && vm.searchCriteria.rent);
        });
    }

    function filterByProvince(results) {
        return _.filter(results, (result)=>{
                if(vm.searchCriteria.province !== false){
                    return result.province === vm.searchCriteria.province;
                }else{
                    return true;
                }
            });
    }
    function filterByRealEstateType(results) {
        return _.filter(results, (result)=>{
                if(vm.searchCriteria.realEstateType !== false){
                    return result.real_estate_type === vm.searchCriteria.realEstateType;
                }else{
                    return true;
                }
    });
    }
}

export default {
    bindings: {
        realEstateTypes: '<',
        results: '<',
        onSearched: '&'
    },
    template: template,
    controller: SearchController,
    controllerAs: 'Ctrl'
}