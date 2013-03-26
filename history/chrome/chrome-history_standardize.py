import sys
import os
import csv
import json

name = sys.argv[1]
chromeHist = []

inFName = os.path.join(os.path.dirname(__file__), 'output/'+name+'.csv')
chromeHistCsv = open(inFName, 'r')
histReader = csv.DictReader(chromeHistCsv)

for row in histReader:
    visit = {
        'url': row['url'],
        'title': row['title'],
        'time': row['visit_time'],
    }
    chromeHist.append(visit)

outFName = os.path.join(os.path.dirname(__file__), 'output/'+name+'.json')
chromeHistJson = open(outFName, 'w')
json.dump(chromeHist, chromeHistJson)
