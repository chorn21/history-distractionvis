### to do:
 - add waveform vis
  - slider to show position in song
  - 'blips' to show distraction points
 - audio implementation
  - play sounds at points of distractions
  - add 'focus' amount:
        - relative volumes of ambient chatter vs music
        - both are continuously playing, but one should be dominant
        - perhaps calculate with relative times over intervals (10 seconds/whatever) and fade in between intervals

this shouldn't be too difficult to do - we can just predetermine points of distractions and play the various distraction noises in js as they occur.
