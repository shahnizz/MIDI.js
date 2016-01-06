/*
 ----------------------------------------------------------------------
 Web MIDI API - Native Soundbanks
 ----------------------------------------------------------------------
 http://webaudio.github.io/web-midi-api/
 ----------------------------------------------------------------------
 */
'use strict';
require('../../node_modules/web-midi-api/WebMIDIAPI.min.js');
var plugin = null;
var output = null;
var midi = {api: 'webmidi'};
midi.send = function (data, delay) { // set channel volume
    output.send(data, delay * 1000);
};

midi.setController = function (channel, type, value, delay) {
    output.send([channel, type, value], delay * 1000);
};

midi.setVolume = function (channel, volume, delay) { // set channel volume
    output.send([0xB0 + channel, 0x07, volume], delay * 1000);
};

midi.programChange = function (channel, program, delay) { // change patch (instrument)
    output.send([0xC0 + channel, program], delay * 1000);
};

midi.pitchBend = function(channel, program, delay) { // pitch bend
    output.send([0xE0 + channel, program & 0x7F, program >> 7], delay * 1000);
};

midi.noteOn = function (channel, note, velocity, delay) {
    output.send([0x90 + channel, note, velocity], delay * 1000);
};

midi.noteOff = function (channel, note, delay) {
    output.send([0x80 + channel, note, 0], delay * 1000);
};

midi.chordOn = function (channel, chord, velocity, delay) {
    for (var n = 0; n < chord.length; n++) {
        var note = chord[n];
        output.send([0x90 + channel, note, velocity], delay * 1000);
    }
};

midi.chordOff = function (channel, chord, delay) {
    for (var n = 0; n < chord.length; n++) {
        var note = chord[n];
        output.send([0x80 + channel, note, 0], delay * 1000);
    }
};

midi.stopAllNotes = function () {
    output.cancel();
    for (var channel = 0; channel < 16; channel++) {
        output.send([0xB0 + channel, 0x7B, 0]);
    }
};

midi.connect = function (opts) {
    window.navigator.requestMIDIAccess().then(function (access) {
        plugin = access;
        var pluginOutputs = plugin.outputs;
        if (typeof pluginOutputs == 'function') pluginOutputs = pluginOutputs();  // Chrome pre-43
        if (pluginOutputs.size > 0) {
            output = pluginOutputs.values().next().value;
            opts.onsuccess && opts.onsuccess();
        }
    });
    return this;
};

module.exports = midi;