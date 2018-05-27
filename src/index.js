import angular from 'angular';

// components
import main from './components/main/main';
import pagination from './components/pagination/pagination';
import navigationBar from './components/navigation-bar/navigation-bar';
import search from './components/search/search';
import result from './components/result/result';
import results from './components/results/results';
import foot from './components/foot/foot';

// filters
import thaiCurrency from './filters/thai-currency';

angular.module('app', [])
    .component('main', main)
    .component('pagination', pagination)
    .component('navigationBar', navigationBar)
    .component('search', search)
    .component('result', result)
    .component('results', results)
    .component('foot', foot)
    .filter('thaiCurrency', thaiCurrency);

