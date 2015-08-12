/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    'use strict';
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name: 'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */

/*global console, prompt*/

/**
* @param {string} destination
*/
function countPopulation() {
    'use strict';
    var requests = ['/countries', '/cities', '/populations'], responses = {}, i, destination;
    destination = prompt("Введите название города, государства или континента, численность населения которого хотите узнать", "Africa");
    
    function callbackFactory(request) {
        return function (error, result) {
            responses[request] = result;
            var l = [], K, c = [], cc = [], p = 0, isData = false, i, j, textNode, node;
            for (K in responses) {
                if (responses.hasOwnProperty(K)) {
                    l.push(K);
                }
            }

            if (l.length === 3) {

                for (i = 0; i < responses['/countries'].length; i += 1) {
                    if (responses['/countries'][i].continent === destination) {
                        c.push(responses['/countries'][i].name);
                    }
                }
                
                if (c.length === 0) {
                    c.push(destination);
                }

                for (i = 0; i < responses['/cities'].length; i += 1) {
                    for (j = 0; j < c.length; j += 1) {
                        if (responses['/cities'][i].country === c[j]) {
                            cc.push(responses['/cities'][i].name);
                        }
                    }
                }
                
                if (cc.length === 0) {
                    cc.push(destination);
                }

                for (i = 0; i < responses['/populations'].length; i += 1) {
                    for (j = 0; j < cc.length; j += 1) {
                        if (responses['/populations'][i].name === cc[j]) {
                            p += responses['/populations'][i].count;
                            isData = true;
                        }
                    }
                }
                
                node = document.createElement("p");
                if (isData) {
                    textNode = document.createTextNode('Total population in '
                                                       + destination + ': ' + p);
                } else {
                    textNode = document.createTextNode('No data on population in '
                                                       + destination + '.');
                }
                node.appendChild(textNode);
                document.getElementById("answers").appendChild(node);
            }
        };
    }
    
    for (i = 0; i < 3; i += 1) {
        getData(requests[i], callbackFactory(requests[i]));
    }
}