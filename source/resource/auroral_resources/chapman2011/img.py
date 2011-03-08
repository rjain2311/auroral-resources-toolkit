#!/usr/bin/env python

import glob, csv, re

images = []
thumbs = []
metaTitle = {}
metaDescr = {}

# grab them all
raw_images = glob.glob('*.jpg')

# subset out any thumbnails
for image in raw_images:
  image = image.strip()
  match = re.search('.*[thumb].*', image)
  if match != None:
    thumbs.append(image)

# nifty list comprehension to get only the ones that aren't thumbs
images = [img for img in raw_images if img not in thumbs]

# grab the metadata for later reference
metadata = csv.reader(open("img.csv", "rb"))
for row in metadata:
  metaTitle[row[0]] = row[1]
  metaDescr[row[0]] = row[2]

# spit out the list
print "var data = ["

for image in sorted(images):
  img = str(image).strip()
  
  # normal sized thumb
  im = Image.open(img)
  im.thumbnail((128, 128), Image.ANTIALIAS)
  im.save("T_" + infile, "JPEG")
  
  thm = img.replace('.jpg', '_thumb.jpg')
  sthm = img.replace('.jpg', '_smallthumb.jpg')
  print "    {\n        image:'/art/resource/auroral_resources/chapman2011/"+thm+\
  "',\n        link:'/art/resource/auroral_resources/chapman2011/"+img+\
  "',\n        thumb:'/art/resource/auroral_resources/chapman2011/"+sthm+\
  "',\n        title:'"+metaTitle[img]+\
  "',\n        description:'"+metaDescr[img]+\
  "'\n    },\n"

print "];\n"
