/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

import csv from 'csvtojson/v2';
import _ from 'lodash';
import template from './results.html';

ResultsController.$inject = ['$http', '$scope'];

function ResultsController($http, $scope){

    let vm = this;

    vm.results = [{price: '10000'}];
    vm.$onInit = ()=>{
        $http.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSw9Zp1AtpFjgkYMQ4aAJsSOIC_NxZXpL9ywmgu8V8W-XNVxqfLKbQPxoqAfZ2Be0G8wr0B41RT32kt/pub?gid=0&single=true&output=csv')
            .then((res)=>{
            csv({
                    noheader:true,
                    output: "csv"
                })
            .fromString(res.data)
            .then((csvRows)=>{
                let fields = csvRows.shift()
                vm.results = _.map(csvRows, (row)=>{
                                    let result = {};
                                    for(let i = 0; i < fields.length; i++){
                                        result[fields[i]] = row[i];
                                    }
                                    result.tags = result.tags.split(',');
                                    result.images = result.images.split(',');
                                    return result;
                                });
                $scope.$apply();
                console.log(vm.results);
                vm.test = 'hello World'
             })
        });
    }
}

export default {
    template: template,
    controller: ResultsController,
    controllerAs: 'Ctrl'
}