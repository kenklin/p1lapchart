p1lapchart
==========
I've combined my love of code and motorsports together to programmatically create 
[lap charts](http://www.collinsdictionary.com/dictionary/english/lap-chart) from amatuer and professional race results posted at
[MyLaps.com](http://mylaps.com).  These charts show cars and their race positions (Y axis) at each lap (X axis) in the race.

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
Click on the final (bottom-most) picture above to run p1lapchart on the race with id=2695656.
The *P1Software* section below points to pages with groups of lapcharts.

There currently is no nice way of finding the MyLaps.com id for a race,
except to find the race on MyLaps.com and copy the id embedded in its URL.  :(

P1Software.com
--------------
The [P1Software.com Lapchart](http://p1software.com/lapchart) page compiles lapcharts for selected race series including:

- [Grand-Am Rolex / Continental Tire](http://p1software.com/lapchart/grand-american-road-racing-grand-am/)

- [BMW CCA Club Racing](http://p1software.com/lapchart/bmw-cca-club-racing)

- [24 Hours of LeMONS](http://p1software.com/lapchart/24-hours-of-lemons/)

- SCCA
    - [SCCA Club Racing](http://p1software.com/lapchart/scca-club-racing/)
    - [Tri-Region SCCA](http://p1software.com/lapchart/tri-region-scca/)
    - [South Jersey Region, SCCA](http://p1software.com/lapchart/south-jersey-region-scca)
    - [San Franciso Region SCCA](http://p1software.com/lapchart/san-francisco-region-scca)

Backstory
---------
In 2010-2012 [Grand-Am](http://grand-am.com) race seasons, I worked weekends with 
[Phoenix Performance](http://phoenixperformance-news.com/) for the Subaru Road Racing Team.
I wrote custom software that normalized the live track information transmitted to teams.
A program parsed the [putty.log](http://putty.org) stream attached to our TransNET RS232 receiver and produced
CSV files that [RTDFile](https://github.com/kenklin/rtdfile) used to populated our Excel spreadsheet.
A series of web-based dashboards written by 
[Michael](https://github.com/michaelelin) and 
[David](https://github.com/crazycow013)
then used this data to derive lap, time, and fuel information
to help with race strategy.  These were fun, but very tense weekends!

Unfortunately, at the beginning of 2013, the factory [terminated funding](http://subiesport.tv/site/2013/02/subaru-terminating-road-racing-team/).
[Phoenix Performance](http://phoenixperformance-news.com/) continues to build, race, and sell championship winning cars.
I continue to tinker at the intersection of software and motorsports.


![](http://p1software.com/wp-content/uploads/2013/08/ken_srrt_2_small.jpg)

**2014 Update**

I've returned to the rebooted [Phoenix American Motorsports](https://www.facebook.com/PhoenixAM) team for the 2014 [IMSA](http://imsa.com) [Continental Tire SportsCar Challenge](http://www.imsa.com/series/sportscar-challenge) where we are campaigning a pair of Boss 302R Mustangs.

Read more about race analytics at [P1Software.com](http://p1software.com).
![](https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfp1/t1.0-9/10492571_339005756246937_4506204574583915095_n.jpg)

**2015 Update**

I now work on P1Software full time and have two data products servicing [IMSA](http://imsa.com) WeatherTech and Continental race teams:

- [P1TS](http://p1software.com/p1imsa/p1imsa-home-page/) software provides team members with real-time information an visualizations they need for race strategy.

- [P1Analaysis.com](http://p1analysis.com) subscription provides team members with post-session reports for study and analysis.
