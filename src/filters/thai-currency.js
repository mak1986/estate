/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

thaiCurrency.$inject = ['$filter'];

function thaiCurrency($filter){
    return function(input, fractionSize){
        input = $filter('currency')(input, '', fractionSize);
        return input + ' บาท';
    }
}

export default thaiCurrency;