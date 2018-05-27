/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

import csv from 'csvtojson/v2';
import _ from 'lodash';
import template from './main.html';

MainController.$inject = ['$http', '$scope'];

function MainController($http, $scope){

    /**
     * Private properties
     */

    let vm = this;
    let realEstateTypesApi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSw9Zp1AtpFjgkYMQ4aAJsSOIC_NxZXpL9ywmgu8V8W-XNVxqfLKbQPxoqAfZ2Be0G8wr0B41RT32kt/pub?gid=540692353&single=true&output=csv';

    /**
     * Public Properties
     */

    vm.originalResults = [];
    vm.results = [];
    vm.realEstateTypes = [];
    vm.searchCriteia = {};

    /**
     * Public method mappings
     */

    vm.setResults = setResults;

    /**
     * Life cycle hooks
     */

    vm.$onInit = ()=>{

        setupRealEstateTypes();



        $http.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSw9Zp1AtpFjgkYMQ4aAJsSOIC_NxZXpL9ywmgu8V8W-XNVxqfLKbQPxoqAfZ2Be0G8wr0B41RT32kt/pub?gid=0&single=true&output=csv')
            .then((res)=>{
                csv({
                        noheader: true,
                        output: "csv"
                    })
                .fromString(res.data)
                .then((csvRows)=>{
                    let fields = csvRows.shift()
                    vm.originalResults = _.map(csvRows, (row)=>{
                        let result = {};
                    for(let i = 0; i < fields.length; i++){
                        result[fields[i]] = row[i];
                    }
                    result.price = parseFloat(result.price);
                    result.characteristics = result.characteristics.split(',');
                    result.places = result.places.split(',');
                    result.images = result.images.split(',');
                    return result;
                });
                vm.results = angular.copy(vm.originalResults);
                $scope.$apply();
            });
        });
    }

    function setResults(results) {
        vm.results = results;
    }

    /**
     * Private methods
     */

    function setupRealEstateTypes(){
        $http.get(realEstateTypesApi)
            .then((res)=>{
            csv({
                noheader: true,
                output: "csv"
            })
            .fromString(res.data)
            .then((csvRows)=>{
                vm.realEstateTypes  = _.flatten(csvRows);
            });
        });
    }
}

export default {
    template: template,
    controller: MainController,
    controllerAs: 'Ctrl'
}