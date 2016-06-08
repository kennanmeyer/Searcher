from bs4 import BeautifulSoup, SoupStrainer
import csv
import urllib2
import codecs
import sys
import json
import os

response = urllib2.urlopen("https://duapp2.drexel.edu/webtms_du/app?component=quarterTermDetailsLast&page=Home&service=direct&sp=ZH4sIAAAAAAAAADWMPQ6CQBCFR4w%2FtbGXC7iAgcpSSxoDFxjZCcGwCLOzSuWJvJp3cA3xld%2F73nt%2FYGEZdqSd0kwjtaphUU%2B6irFKo6AqiQ1MmQUwz2GFlZSNIYFtfsMHRnZoox%2BwgqY%2F5rAWPzndtTc2k9FiV0eFcNPV%2F%2F5MthrgBcHY9wLLQ5ykaeYvC2cMcXhxyF4Lk3SfZF%2BDeVYGpgAAAA%3D%3D")
html = response.read()
soup = BeautifulSoup(html,"lxml")

table = soup.find("div", {"id" : "sideLeft"})

l = table.find_all("a")

a=[]
colleges = []
for link in l:
        if link.has_attr('href'):
		colleges.append("https://duapp2.drexel.edu"+link['href'])
for c in colleges:
	response = urllib2.urlopen(c)
	html = response.read()
	soup = BeautifulSoup(html,"lxml")

	table = soup.find("table", {"class" : "collegePanel"})

	links = []
	for link in table.find_all('a'):
		links.append("https://duapp2.drexel.edu"+link['href'])


	for link in links:
		response = urllib2.urlopen(link)
		html = response.read()
		soup = BeautifulSoup(html,"lxml")

		tb = soup.find("table", {"bgcolor" : "#cccccc"})

		rows = tb.find_all("tr",recursive=False)[1:]

		d=[]
		for i in rows:
			l = i.find("a", href=True)
			if l:
				d.append("https://duapp2.drexel.edu"+l['href'])
		a = []
		for detail in d:
			r3 = urllib2.urlopen(detail)
			html3 = r3.read()
			soup2 = BeautifulSoup(html3,"lxml")

			tb = soup2.find("table", {"bgcolor" : "#cccccc"})
			tbody = tb.tobody
			
			rows = tb.findChildren('tr')
			
			r= []
			for i in rows:
				col = i.findChildren('td')
				if len(col) > 1:
					one = col[1].string
					if one is not None:
						r.append(one.encode('utf-8'))
					else:
						r.append(one)
			ttb = soup2.find("table", {"bordercolor" : "#ffffff"})
			xxx = ttb.find_all("tr", recursive=False)
			ccc = xxx[-1]
			stats = ccc.find_all("tr")
			stats.pop()
			stats.pop(0)
			for ss in stats:
				e = ss.find_all('td')
				if e[0].string is not None:
					r.append(e[0].string.encode('utf-8'))
				else:
					r.append(e[0].string)
				if e[1].string is not None:
					r.append(e[1].string.encode('utf-8'))
				else:
					r.append(e[1].string)
				t_string = e[2].string.split(" - ")
				if len(t_string) < 2:
					r.append("TBD")
					r.append("TBD")
				else:
					if t_string[0] is not None:
						r.append(t_string[0].encode('utf-8'))
					else:
						r.append(t_string[0])
					if t_string[1] is not None:
						r.append(t_string[1].encode('utf-8'))
					else:
						r.append(t_string[1])
				if e[3].string is not None:
					r.append(e[3].string.encode('utf-8'))
				else:
					r.append(e[3].string)
				if e[4].string is not None:
					r.append(e[4].string.encode('utf-8'))
				else:
					r.append(e[4].string)
				if e[5].string is not None:
					r.append(e[5].string.encode('utf-8'))
				else:
					r.append(e[5].string)
				break
			a.append(r)

		with open("class_temp.csv", "ab") as f:
			writer = csv.writer(f)
			writer.writerows(a)
