p1lapchart
==========
I've combined my love of code and motorsports together to automatically create 
[lap charts](http://www.collinsdictionary.com/dictionary/english/lap-chart) from html race results posted at
[MyLaps.com](http://mylaps.com).  These charts show cars and their race positions at each lap in the race.

An [AWS EC2](http://aws.amazon.com/ec2/) server runs a [Node](http://nodejs.org)/[Express](http://expressjs.com/)
web application that [web scrapes](http://en.wikipedia.org/wiki/Web_scraping) the source html from 
[MyLaps.com](http://mylaps.com) (top screenshot) using
[jQuery](http://jquery.org).
It produces a [JSON](http://en.wikipedia.org/wiki/Json) representation of the race information through a 
[REST API](http://en.wikipedia.org/wiki/Representational_state_transfer).

The final graphical visualizations (bottom screenshot) are created on the browser via JavaScript that uses
[D3](http://d3js.org/) to graphically render the race information from the JSON objects.  

<table>
<tr><td align="center">
<a href="http://www.mylaps.com/en/lapchart/2695656"><img src="https://github.com/kenklin/p1lapchart/blob/master/images/p1lapchart-mylaps.png?raw=true"></a>
<br><i>Source html from mylaps.com
</td></tr>
<tr><td align="center">
&#8595;
<br><a href="https://github.com/kenklin/p1lapchart/blob/master/node-p1lapchart.js"><strong>node_p1lapchart.js</strong></a>
<br><i>jQuery web scraper implemented as Node application
<br>running on AWS EC2
<br>&#8595;
</td></tr>
<tr><td align="center">
<a href="https://github.com/kenklin/p1lapchart/blob/master/lapchart/2695656.json">2695656.json</a>
<br><i>Resulting JSON object
</td></tr>
<tr><td align="center">
&#8595;
<br><a href="https://github.com/kenklin/p1lapchart/blob/master/index.html"><strong>index.html</strong></a>
<br><i>D3 visualization
<br>&#8595;
</td></tr>
<tr><td align="center">
<a href="http://kenlin.com/x/p1lapchart/?id=2695656"><img src="https://github.com/kenklin/p1lapchart/blob/master/images/p1lapchart-d3.png?raw=true"></a>
</td></tr>
</table>

To Run
------
Click on the final (bottom-most) picture above to run p1lapchart on 2695656.
The *P1Software* section below points to pages with groups of lapcharts.

There currently is no nice way of looking the MyLaps.com id for a race,
except to find the race on MyLaps.com and note the id in its URL.  :(

P1Software.com
--------------
The [P1Software.com Lapchart](http://p1software.com/lapchart) page compiles lapcharts for selected race series including:

[Grand-Am Rolex / Continental Tire](http://p1software.com/lapchart/grand-american-road-racing-grand-am/)

[BMW CCA Club Racing](http://p1software.com/lapchart/bmw-cca-club-racing)

[South Jersey Region, SCCA](http://p1software.com/lapchart/south-jersey-region-scca)

[San Franciso Region SCCA](http://p1software.com/lapchart/san-francisco-region-scca)

Backstory
---------
In 2010-2012 [Grand-Am](http://grand-am.com) race seasons, I worked weekends with 
[Phoenix Performance](http://phoenixperformance-news.com/) for the Subaru Road Racing Team.
I wrote custom software that normalized the live track information transmitted to teams.
A series of web-based dashboards then used this data to derive lap, time, and fuel information
to help with race strategy.  These were fun, but very tense weekends!

Unfortunately, at the beginning of 2013, the factory [terminated funding](http://subiesport.tv/site/2013/02/subaru-terminating-road-racing-team/).
Phoenix Performance continues to build, race, and sell championship winning cars.
I continue to tinker at the intersection of software and motorsports.
