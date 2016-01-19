/*
 ----------------------------------------------------------
 GeneralMIDI
 ----------------------------------------------------------
 */
var root = {};
var _ = {
    find: require('lodash.find')
};
root.GM = (function () {
    var instruments = require('../instruments.json');
    var clean = function (name) {
        return name.replace(/[^a-z0-9 ]/gi, '').replace(/[ ]/g, '_').toLowerCase();
    };

    var res = {
        byId: function(id){
            var ins;
            _.find(instruments, function(categorie, key){
                var result = _.find(categorie, function(instrument, key){
                    if(instrument == id){
                        ins = {};
                        ins.instrument = key;
                        ins.number = instrument;
                        ins.id = clean(key);
                        return true;
                    }
                });
                if(result){
                    ins.category = key;
                    return true;
                }
            });

            return ins;
        },
        byName: function(name){
            var ins;
            _.find(instruments, function(categorie, key){
                var result = _.find(categorie, function(instrument, key){
                    if(name == key){
                        ins = {};
                        ins.instrument = key;
                        ins.number = instrument;
                        ins.id = clean(key);
                        return true;
                    }
                });
                if(result){
                    ins.category = key;
                    return true;
                }
            });

            return ins;
        },
        byCleanName: function(name){
            var ins;
            _.find(instruments, function(categorie, key){
                var result = _.find(categorie, function(instrument, key){
                    if(name == clean(key)){
                        ins = {};
                        ins.instrument = key;
                        ins.number = instrument;
                        ins.id = clean(key);
                        return true;
                    }
                });
                if(result){
                    ins.category = key;
                    return true;
                }
            });

            return ins;
        },
        byCategory: function(cat){
            return _.find(instruments, function(categorie, key){
                return cat == key;
            })
        }
    };

    return res;
})();

/* get/setInstrument
 --------------------------------------------------- */
root.getInstrument = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.instrument;
};

root.setInstrument = function (channelId, program, delay) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.instrument = program;
        }, delay);
    } else {
        channel.instrument = program;
    }
};

/* get/setMono
 --------------------------------------------------- */
root.getMono = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.mono;
};

root.setMono = function (channelId, truthy, delay) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.mono = truthy;
        }, delay);
    } else {
        channel.mono = truthy;
    }
};

/* get/setOmni
 --------------------------------------------------- */
root.getOmni = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.omni;
};

root.setOmni = function (channelId, truthy) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.omni = truthy;
        }, delay);
    } else {
        channel.omni = truthy;
    }
};

/* get/setSolo
 --------------------------------------------------- */
root.getSolo = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.solo;
};

root.setSolo = function (channelId, truthy) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.solo = truthy;
        }, delay);
    } else {
        channel.solo = truthy;
    }
};


/* note conversions
 --------------------------------------------------- */
root.keyToNote = {}; // C8  == 108
root.noteToKey = {}; // 108 ==  C8

(function () {
    var A0 = 0x15; // first note
    var C8 = 0x6C; // last note
    var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    for (var n = A0; n <= C8; n++) {
        var octave = (n - 12) / 12 >> 0;
        var name = number2key[n % 12] + octave;
        root.keyToNote[name] = n;
        root.noteToKey[n] = name;
    }
})();

module.exports = root