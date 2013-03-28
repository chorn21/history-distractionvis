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


How To Extract History
======================
Note: the output files containing individual's browser history have been added to the .gitignore.

Chrome
------
Chrome history file location (SQLite): `~/Library/Application\ Support/Google/Chrome/Default/History`

About the chrome history file: http://lowmanio.co.uk/blog/entries/how-google-chrome-stores-web-history/

 1. Open up an SQL client and connect to Chrome's history file.
 2. Run the SQL script located in `/history/chrome/chrome-history_extraction.sql`.
 3. Save the results in `/history/chrome/output/YOUR-NAME.csv`.  These csv files
    should have one table entry per line, and columns within a line should be
    comma deliminated.  Also, NULL values should result in an empty entry,
    ie `... URL: NULL ... => ,,`.  Finally, the column headers should be included
    as the files first line.
 4. From the project's root directory, run the python script located in
    `/history/chrome/chrome-history_standardize.py` by using the command below
    on the output file.  This will create another output file
    `/history/chrome/output/YOUR-NAME.json`, which is a valid input to the
    visualization.  Note the script takes an input parameter `YOUR-NAME`.

    python -m history.chrome.chrome-history_standardize YOUR-NAME

 5. If you want to combine input from mulitple browsers, run the python script
    located in `/history/history_collator.py`.  This will merge the history
    from each browser's YOUR-NAME.json, so it is necessary to run step 4 for all
    browsers you want to included in the collated history.  It creates a new
    file `/history/output/YOUR-NAME.json`.
