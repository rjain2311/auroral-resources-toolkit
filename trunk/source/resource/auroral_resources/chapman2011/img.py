#!/usr/bin/env python

"""
    {
        image: 'img1.jpg',
        thumb: 'thumb1.jpg',
        title: 'my first image',
        description: 'Lorem ipsum caption',
        link: 'http://domain.com'
    },
"""

import glob, csv, re

images = []
thumbs = []
meta = {}

# grab them all
raw_images = glob.glob('*.jpg')

# subset out any thumbnails
for image in raw_images:
  image = image.strip()
  match = re.search('.*[thumb].*', image)
  if match != None:
    thumbs.append(image)

images = [img for img in raw_images if img not in thumbs]

# grab the metadata for later reference
metadata = csv.reader(open("img.csv", "rb"))
for row in metadata:
  meta[row[0]] = row[2]

# spit out the list
print "var data = ["

for image in sorted(images):
  img = str(image).strip()
  thm = img.replace('.jpg', '_thumb.jpg')
  sthm = img.replace('.jpg', '_smallthumb.jpg')
  print "    {\n        image:'/art/resource/auroral_resources/chapman2011/"+thm+\
  "',\n        link:'/art/resource/auroral_resources/chapman2011/"+img+\
  "',\n        thumb:'/art/resource/auroral_resources/chapman2011/"+sthm+\
  "',\n        title:'"+img+\
  "',\n        description:'"+meta[img]+\
  "'\n    },\n"

print "];\n"
