import angular from 'angular';

// components
import navigationBar from './components/navigation-bar/navigation-bar';
import search from './components/search/search';
import result from './components/result/result';
import results from './components/results/results';
import foot from './components/foot/foot';

angular.module('app', [])
    .component('navigationBar', navigationBar)
    .component('search', search)
    .component('result', result)
    .component('results', results)
    .component('foot', foot);

