/*
 ----------------------------------------------------------
 MIDI.Player : 0.3.1 : 2015-03-26
 ----------------------------------------------------------
 https://github.com/mudcube/MIDI.js
 ----------------------------------------------------------
 */
module.exports = function (MIDI) {
    var generalMIDI = require('./gm');
    var Replayer = require('../jasmid/replayer');
    var MidiFile = require('../jasmid/midifile');
    'use strict';
    var midi = {};
    midi.transpose = 0;
    midi.tracks = {};
    midi.currentTime = 0;
    midi.endTime = 0;
    midi.restart = 0;
    midi.playing = false;
    midi.timeWarp = 1;
    midi.startDelay = 0;
    midi.start =
        midi.resume = function (onsuccess) {
            if (midi.currentTime < -1) {
                midi.currentTime = -1;
            }
            midi.setChannelInstruments(midi.currentTime);
            startAudio(midi.currentTime, null, onsuccess);
        };
    midi.pause = function () {
        var tmp = midi.restart;
        stopAudio();
        midi.restart = tmp;
    };

    midi.stop = function () {
        stopAudio();
        midi.restart = 0;
        midi.currentTime = 0;
    };

    midi.addListener = function (onsuccess) {
        onMidiEvent = onsuccess;
    };

    midi.removeListener = function () {
        onMidiEvent = undefined;
    };

    midi.clearAnimation = function () {
        if (midi.animationFrameId) {
            cancelAnimationFrame(midi.animationFrameId);
        }
    };

    midi.setAnimation = function (callback) {
        var currentTime = 0;
        var tOurTime = 0;
        var tTheirTime = 0;
        //
        midi.clearAnimation();
        ///
        var frame = function () {
            midi.animationFrameId = requestAnimationFrame(frame);
            ///
            if (midi.endTime === 0) {
                return;
            }
            if (midi.playing) {
                currentTime = (tTheirTime === midi.currentTime) ? tOurTime - Date.now() : 0;
                if (midi.currentTime === 0) {
                    currentTime = 0;
                } else {
                    currentTime = midi.currentTime - currentTime;
                }
                if (tTheirTime !== midi.currentTime) {
                    tOurTime = Date.now();
                    tTheirTime = midi.currentTime;
                }
            } else { // paused
                currentTime = midi.currentTime;
            }
            ///
            var endTime = midi.endTime;
            var percent = currentTime / endTime;
            var total = currentTime / 1000;
            var minutes = total / 60;
            var seconds = total - (minutes * 60);
            var t1 = minutes * 60 + seconds;
            var t2 = (endTime / 1000);
            ///
            if (t2 - t1 < -1.0) {
                return;
            } else {
                callback({
                    now: t1,
                    end: t2,
                    events: noteRegistrar
                });
            }
        };
        ///
        requestAnimationFrame(frame);
    };
    // helpers
    midi.loadMidiFile = function (onsuccess, onprogress, onerror) {
        midi.replayer = new Replayer(MidiFile(midi.currentData, midi.transpose), midi.timeWarp, null);
        midi.data = midi.replayer.getData();
        midi.endTime = getLength();
        midi.tracks = midi.getFileTracks();
        midi.instruments = midi.getFileInstruments();

        MIDI.loadResource(
            {
                instruments: midi.instruments,
                onsuccess: function () {
                    MIDI.reconnect(onsuccess);
                },
                onprogress: onprogress,
                onerror: onerror
            });
    };

    midi.loadFile = function (file, onsuccess, onprogress, onerror) {
        midi.stop();
        if (file.indexOf('base64,') !== -1) {
            var data = window.atob(file.split(',')[1]);
            midi.currentData = data;
            midi.loadMidiFile(onsuccess, onprogress, onerror);
        } else {
            var fetch = new XMLHttpRequest();
            fetch.open('GET', file);
            fetch.overrideMimeType('text/plain; charset=x-user-defined');
            fetch.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        var t = this.responseText || '';
                        var ff = [];
                        var mx = t.length;
                        var scc = String.fromCharCode;
                        for (var z = 0; z < mx; z++) {
                            ff[z] = scc(t.charCodeAt(z) & 255);
                        }
                        ///
                        var data = ff.join('');
                        midi.currentData = data;
                        midi.loadMidiFile(onsuccess, onprogress, onerror);
                    } else {
                        onerror && onerror('Unable to load MIDI file');
                    }
                }
            };
            fetch.send();
        }
    };

    midi.getFileTracks = function () {
        var tracks = {};
        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'programChange':
                    tracks[midi.data[n][0].track] = channel;
                    break;
            }
        }
        return tracks;
    }

    midi.setChannelInstruments = function(currentTime){

        var instruments = {};
        var programs = {};
        var events = {};

        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'programChange':
                    if(event.deltaTime <=  currentTime){
                        events[event.channel] = event;
                    }
                    break;
            }
        }
        for (var key in events) {
            if (key == 9) {
                MIDI.programChange(key, events[key].programNumber + 128, 0);
            } else  {
                MIDI.programChange(key, events[key].programNumber, 0);
            }
        }
    };

    midi.getFileInstruments = function () {
        var instruments = {};
        var programs = {};
        var channels = {};

        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'programChange':
                    if (channel == 9) {
                        // The drumset is outside of the general midi spectrum, so we just added them after 127
                        var gm = generalMIDI.GM.byId(event.programNumber + 128);
                        instruments[gm.id] = true;
                    } else {
                        var gm = generalMIDI.GM.byId(event.programNumber);
                        instruments[gm.id] = true;
                    }
                    break;
            }
        }

        var ret = [];
        for (var key in instruments) {
            ret.push(key);
        }
        return ret;
    };

    // Playing the audio

    var eventQueue = []; // hold events to be triggered
    var queuedTime; //
    var startTime = 0; // to measure time elapse
    var noteRegistrar = {}; // get event for requested note
    var onMidiEvent = undefined; // listener
    var scheduleTracking = function (channel, note, currentTime, offset, message, velocity, time) {
        return setTimeout(function () {
            var data = {
                channel: channel,
                note: note,
                now: currentTime,
                end: midi.endTime,
                message: message,
                velocity: velocity
            };
            //
            if (message === 128) {
                delete noteRegistrar[note];
            } else {
                noteRegistrar[note] = data;
            }
            if (onMidiEvent) {
                onMidiEvent(data);
            }
            midi.currentTime = currentTime;
            ///
            eventQueue.shift();
            ///
            if (eventQueue.length < 1000) {
                startAudio(queuedTime, true);
            } else if (midi.currentTime === queuedTime && queuedTime < midi.endTime) { // grab next sequence
                startAudio(queuedTime, true);
            }
        }, currentTime - offset);
    };

    var getContext = function () {
        if (MIDI.api === 'webaudio') {
            return MIDI.getContext();
        } else {
            midi.ctx = {currentTime: 0};
        }
        return midi.ctx;
    };

    var getLength = function () {
        var data = midi.data;

        var length = data.length;
        var totalTime = 0.5;
        for (var n = 0; n < length; n++) {
            totalTime += data[n][1];
        }
        return totalTime;
    };

    var __now;
    var getNow = function () {
        if (window.performance && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    };

    var startAudio = function (currentTime, fromCache, onsuccess) {
        if (!midi.replayer) {
            return;
        }
        if (!fromCache) {
            if (typeof currentTime === 'undefined') {
                currentTime = midi.restart;
            }
            ///
            midi.playing && stopAudio();
            midi.playing = true;
            midi.data = midi.replayer.getData();
            midi.endTime = getLength();
        }
        ///
        var note;
        var offset = 0;
        var messages = 0;
        var data = midi.data;
        var ctx = getContext();
        var length = data.length;
        //
        queuedTime = 0;
        ///
        var interval = eventQueue[0] && eventQueue[0].interval || 0;
        var foffset = currentTime - midi.currentTime;
        ///
        if (MIDI.api === 'webmidi') {
            ctx.currentTime = getNow() / 1000;
        } else if (MIDI.api !== 'webaudio') { // set currentTime on ctx
            var now = getNow();
            __now = __now || now;
            ctx.currentTime = (now - __now) / 1000;
        }
        ///
        startTime = ctx.currentTime;
        ///
        for (var n = 0; n < length && messages < 100; n++) {
            var obj = data[n];
            var event = obj[0].event;
            if ((queuedTime += obj[1]) < currentTime) {
                offset = queuedTime;
                continue;
            }

            ///
            currentTime = queuedTime - offset;
            ///

            if (event.type !== 'channel') {
                continue;
            }
            ///
            var channelId = event.channel;

            var channel = MIDI.channels[channelId];
            var delay = ctx.currentTime + ((currentTime + foffset + midi.startDelay) / 1000);
            var queueTime = queuedTime - offset + midi.startDelay;
            switch (event.subtype) {
                case 'controller':
                    MIDI.setController(channelId, event.controllerType, event.value, delay);
                    break;
                case 'programChange':
                    // The drumset is outside of the general midi spectrum, so we just added them after 127
                    if (channelId == 9) {
                        MIDI.programChange(channelId, event.programNumber + 128, delay);
                    } else  {
                        MIDI.programChange(channelId, event.programNumber, delay);
                    }
                    break;
                case 'pitchBend':
                    MIDI.pitchBend(channelId, event.value, delay);
                    break;
                case 'noteOn':
                    if (channel.mute) break;
                    note = event.noteNumber - (midi.MIDIOffset || 0);
                    var temp = {
                        event: event,
                        time: queueTime,
                        source: MIDI.noteOn(channelId, event.noteNumber, event.velocity, delay),
                        interval: scheduleTracking(channelId, note, queuedTime + midi.startDelay, offset - foffset, 144, event.velocity)
                    };
                    eventQueue.push(temp);
                    messages++;
                    break;
                case 'noteOff':
                    if (channel.mute) break;
                    note = event.noteNumber - (midi.MIDIOffset || 0);
                    eventQueue.push({
                        event: event,
                        time: queueTime,
                        source: MIDI.noteOff(channelId, event.noteNumber, delay),
                        interval: scheduleTracking(channelId, note, queuedTime, offset - foffset, 128, 0)
                    });
                    break;
                default:
                    break;
            }
        }
        ///
        onsuccess && onsuccess(eventQueue);
    };

    var stopAudio = function () {
        var ctx = getContext();
        midi.playing = false;
        midi.restart += (ctx.currentTime - startTime) * 1000;
        // stop the audio, and intervals
        while (eventQueue.length) {
            var o = eventQueue.pop();
            window.clearInterval(o.interval);
            if (!o.source) continue; // is not webaudio
            if (typeof(o.source) === 'number') {
                window.clearTimeout(o.source);
            } else { // webaudio
                o.source.disconnect(0);
            }
        }
        // run callback to cancel any notes still playing
        for (var key in noteRegistrar) {
            var o = noteRegistrar[key]
            if (noteRegistrar[key].message === 144 && onMidiEvent) {
                onMidiEvent({
                    channel: o.channel,
                    note: o.note,
                    now: o.now,
                    end: o.end,
                    message: 128,
                    velocity: o.velocity
                });
            }
        }
        // reset noteRegistrar
        noteRegistrar = {};
    };

    midi.setChannelVolume = function (val, channel) {
        MIDI.channels[channel].volume = val;
        if (MIDI.api === "webaudio") {
            for (var i = 0; i < eventQueue.length; i++) {
                var event = eventQueue[i];
                if (event && event.source && typeof event.source.setChannelVolume === 'function' && event.source.channel === channel) {
                    event.source.setChannelVolume(val);
                }
            }
        }
    };
    midi.setTrackVolume = function (val, track) {
        midi.setChannelVolume(val, midi.tracks[track]);
    };

    return midi;
};
