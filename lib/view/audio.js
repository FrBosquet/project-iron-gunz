function createEffectTag(sound, type) {
  var audio = document.createElement("AUDIO");
  audio.controls = false;
  audio.autoplay = false;
  audio.setAttribute("src", "audio/effects/" + sound + ".wav");
}
