#!/usr/bin/env ruby
#
# JavaScript Soundfont Builder for MIDI.js
# Author: 0xFE <mohit@muthanna.com>
#
# Requires:
#
#   FluidSynth
#   Lame
#   OggEnc (from vorbis-tools)
#   Ruby Gem: midilib
#   Optionally:
#    * Ruby gem: parallel
#    * Sox
#
#   $ brew install --with-libsndfile fluidsynth
#   $ brew install vorbis-tools lame
#   $ gem install midilib
#
#   For parallel generation
#   $ gem install parallel
#
#   To optimize the sound files by not exporting silent notes
#   $ brew install sox
#
# You'll need to download a GM soundbank to generate audio.
#
# Usage:
#
# 1) Install the above dependencies.
# 2) Edit BUILD_DIR, SOUNDFONT, and INSTRUMENTS as required.
# 3) Edit the other options if needed
# 4) Run without any argument.

require 'base64'
require 'fileutils'
require 'midilib'
require 'zlib'
include FileUtils

# gzip the resulting js files
GZIP = false
# delete the generated mp3 and ogg files
CLEAN_AUDIO = true
# generate the js files in parallel per instrument
PARALLEL = true
# do not generate sound for silent note in the soundfont
OPTIMIZE_EMPTY_NOTES=true

# Output path
BUILD_DIR = "./soundfont"
# Soundfont file path
SOUNDFONT = "/Users/lasconic/Downloads/FluidR3Mono_GM/FluidR3Mono_GM2-200.SF2" # Soundfont file path

# This script will generate MIDI.js-compatible instrument JS files for
# all instruments in the below array. Add or remove as necessary.
INSTRUMENTS = [
0,
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13,
14,
15,
16,
17,
18,
19,
20,
21,
22,
23,
24,
25,
26,
27,
28,
29,
30,
31,
32,
33,
34,
35,
36,
37,
38,
39,
40,
41,
42,
43,
44,
45,
46,
47,
48,
49,
50,
51,
52,
53,
54,
55,
56,
57,
58,
59,
60,
61,
62,
63,
64,
65,
66,
67,
68,
69,
70,
71,
72,
73,
74,
75,
76,
77,
78,
79,
80,
81,
82,
83,
84,
85,
86,
87,
88,
89,
90,
91,
92,
93,
94,
95,
96,
97,
98,
99,
100,
101,
102,
103,
104,
105,
106,
107,
108,
109,
110,
111,
112,
113,
114,
115,
116,
117,
118,
119,
120,
121,
122,
123,
124,
125,
126,
127,

# drumset, they are expected to be over > 127
#standard
128, #0
129, #1
130, #2
131, #3
132, #4
133, #5
134, #6
135, #7
#room
136, #8
137, #9
138, #10
139, #11
140, #12
141, #13
142, #14
143, #15
#power
144, #16
145, #17
146, #18
147, #19
#electronic
152, #24
153, #25
#Jazz
160, #32
161, #33
162, #34
163, #35
164, #36
#Brush
168, #40
169, #41
170, #42
#Orchestra
176, #48
  ];

def generate_instrument_name(i)
  if i < 128
    return MIDI::GM_PATCH_NAMES[i]
  else
    return "Drumset #{i%128}"
  end
end

# The encoders and tools are expected in your PATH. You can supply alternate
# paths by changing the constants below.
OGGENC = `which oggenc`.chomp
LAME = `which lame`.chomp
FLUIDSYNTH = `which fluidsynth`.chomp
if OPTIMIZE_EMPTY_NOTES
  SOX = `which sox`.chomp
end

puts "Building the following instruments using font: " + SOUNDFONT

# Display instrument names.
INSTRUMENTS.each do |i|
  puts "    #{i}: " + generate_instrument_name(i)
end

puts
puts "Using OGG encoder: " + OGGENC
puts "Using MP3 encoder: " + LAME
puts "Using FluidSynth encoder: " + FLUIDSYNTH
if OPTIMIZE_EMPTY_NOTES
  puts "Using Sox: " + SOX
end
puts
puts "Sending output to: " + BUILD_DIR
puts

FileUtils::mkdir_p BUILD_DIR

raise "Can't find soundfont: #{SOUNDFONT}" unless File.exists? SOUNDFONT
raise "Can't find 'oggenc' command" if OGGENC.empty?
raise "Can't find 'lame' command" if LAME.empty?
raise "Can't find 'fluidsynth' command" if FLUIDSYNTH.empty?
if OPTIMIZE_EMPTY_NOTES
  raise "Can't find 'sox' command" if SOX.empty?
end
raise "Output directory does not exist: #{BUILD_DIR}" unless File.exists?(BUILD_DIR)

puts "Hit return to begin."
$stdin.readline

t1 = Time.now
NOTES = {
  "C"  => 0,
  "Db" => 1,
  "D"  => 2,
  "Eb" => 3,
  "E"  => 4,
  "F"  => 5,
  "Gb" => 6,
  "G"  => 7,
  "Ab" => 8,
  "A"  => 9,
  "Bb" => 10,
  "B"  => 11
}

MIDI_C0 = 12
VELOCITY = 85
DURATION = Integer(3000)
TEMP_FILE = "#{BUILD_DIR}/%s_%s_temp.midi"

def deflate(string, level)
  z = Zlib::Deflate.new(level)
  dst = z.deflate(string, Zlib::FINISH)
  z.close
  dst
end

def note_to_int(note, octave)
  value = NOTES[note]
  increment = MIDI_C0 + (octave * 12)
  return value + increment
end

def int_to_note(value)
  raise "Bad Value" if value < MIDI_C0
  reverse_notes = NOTES.invert
  value -= MIDI_C0
  octave = value / 12
  note = value % 12
  return { key: reverse_notes[note],
           octave: octave }
end

# Run a quick table validation
MIDI_C0.upto(100) do |x|
  note = int_to_note x
  raise "Broken table" unless note_to_int(note[:key], note[:octave]) == x
end

def generate_midi(program, note_value, file)
  include MIDI
  seq = Sequence.new()
  track = Track.new(seq)

  seq.tracks << track
  if program < 128
    channel = 0
    p = program
  else
    channel = 9
    p = program - 128
  end
  track.events << ProgramChange.new(channel, Integer(p))
  track.events << NoteOn.new(channel, note_value, VELOCITY, 0) # channel, note, velocity, delta
  track.events << NoteOff.new(channel, note_value, VELOCITY, DURATION)

  File.open(file, 'wb') { | file | seq.write(file) }
end

def run_command(cmd)
  puts "Running: " + cmd
  return `#{cmd}`
end

def midi_to_audio(source, target)
  run_command "#{FLUIDSYNTH} -C no -R no -g 0.5 -F #{target} #{SOUNDFONT} #{source}"
  amplitude = run_command "sox #{target} -n stat 2>&1 | sed -n 's#^Maximum amplitude:[^0-9]*\\([0-9.]*\\)$#\\1#p'"
  if OPTIMIZE_EMPTY_NOTES and amplitude.to_f == 0.0
    rm target
    return false
  end
  run_command "#{OGGENC} -m 32 -M 128 #{target}"
  run_command "#{LAME} -v -b 8 -B 64 #{target}"
  rm target
  return true
end

def open_js_file(instrument_key, type)
  js_file = File.open("#{BUILD_DIR}/#{instrument_key}-#{type}.js", "w")
  js_file.write(
"""
if (typeof(MIDI) === 'undefined') var MIDI = {};
if (typeof(MIDI.Soundfont) === 'undefined') MIDI.Soundfont = {};
MIDI.Soundfont.#{instrument_key} = {
""")
  return js_file
end

def close_js_file(file)
  file.write("\n}\n")
  file.close
end

def base64js(note, file, type)
  output = '"' + note + '": '
  output += '"' + "data:audio/#{type};base64,"
  output += Base64.strict_encode64(File.read(file)) + '"'
  return output
end

def generate_audio(program)
  include MIDI
  instrument = generate_instrument_name(program)
  instrument_key = instrument.downcase.gsub(/[^a-z0-9 ]/, "").gsub(/\s+/, "_")

  puts "Generating audio for: " + instrument + "(#{instrument_key})"

  mkdir_p "#{BUILD_DIR}/#{instrument_key}-mp3"
  mkdir_p "#{BUILD_DIR}/#{instrument_key}-ogg"
  ogg_js_file = open_js_file(instrument_key, "ogg")
  mp3_js_file = open_js_file(instrument_key, "mp3")

  note_to_int("A", 0).upto(note_to_int("C", 8)) do |note_value|
    note = int_to_note(note_value)
    output_name = "#{note[:key]}#{note[:octave]}"
    output_path_prefix = BUILD_DIR + "/#{instrument_key}_" + output_name

    puts "Generating: #{output_name}"
    temp_file_specific = TEMP_FILE % [output_name, instrument_key]
    generate_midi(program, note_value, temp_file_specific)
    conversion_res = midi_to_audio(temp_file_specific, output_path_prefix + ".wav")

    if conversion_res
      puts "Updating JS files..."
      ogg_js_file.write(base64js(output_name, output_path_prefix + ".ogg", "ogg") + ",\n")
      mp3_js_file.write(base64js(output_name, output_path_prefix + ".mp3", "mp3") + ",\n")

      mv output_path_prefix + ".mp3", "#{BUILD_DIR}/#{instrument_key}-mp3/#{output_name}.mp3"
      mv output_path_prefix + ".ogg", "#{BUILD_DIR}/#{instrument_key}-ogg/#{output_name}.ogg"
    else
      puts "#{instrument_key} -- #{output_name} is silent"
    end
    rm temp_file_specific
  end

  close_js_file(ogg_js_file)
  close_js_file(mp3_js_file)

  if CLEAN_AUDIO
    puts "Deleting audio files"
    rm_rf "#{BUILD_DIR}/#{instrument_key}-mp3"
    rm_rf "#{BUILD_DIR}/#{instrument_key}-ogg"
  end

  if GZIP
    puts "Gzipping javascript"
    ogg_js_file = File.read("#{BUILD_DIR}/#{instrument_key}-ogg.js")
    ojsz = File.open("#{BUILD_DIR}/#{instrument_key}-ogg.js.gz", "w")
    ojsz.write(deflate(ogg_js_file, 9));

    mp3_js_file = File.read("#{BUILD_DIR}/#{instrument_key}-mp3.js")
    mjsz = File.open("#{BUILD_DIR}/#{instrument_key}-mp3.js.gz", "w")
    mjsz.write(deflate(mp3_js_file, 9));
  end

end

if PARALLEL
  require 'parallel'
  Parallel.each(INSTRUMENTS, :in_processes=>10){|i| generate_audio(i)}
else
  INSTRUMENTS.each {|i| generate_audio(i)}
end
t2 = Time.now
diff = t2 - t1
puts "DONE in #{diff} seconds"
