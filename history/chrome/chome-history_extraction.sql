SELECT 
       datetime(((visits.visit_time-11644473600000000)/1000000),'unixepoch','localtime')
           as visit_time,
       urls.url,
       urls.title,
       urls.visit_count,
       datetime(((urls.last_visit_time-11644473600000000)/1000000),'unixepoch','localtime')
           as last_visit_time,
       visits.from_visit,
       visits.transition
FROM urls, visits
WHERE urls.id = visits.url
ORDER BY visit_time;
