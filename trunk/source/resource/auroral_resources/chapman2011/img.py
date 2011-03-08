#!/usr/bin/env python

import glob, csv, re, os, Image

images = []
thumbs = []
metaTitle = {}
metaDescr = {}
initialImage = "20110301_010133-1000_JFS.jpg"
iInitial = 0

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
  # the csv sometimes includes './' in the file name column
  key = row[0].replace('./', '')
  metaTitle[key] = row[1]
  metaDescr[key] = row[2]

# spit out the list
print "var data = ["

i=0
for image in sorted(images):
  imgname = str(image).strip()
  basename, ext = os.path.splitext(imgname)
  img = Image.open(imgname)  
  # normal sized thumb
  if not os.path.exists(basename + "_t" + ext):
    img.thumbnail((800, 600), Image.ANTIALIAS)
    img.save(basename + "_t" + ext, "JPEG")
  # small sized thumb
  if not os.path.exists(basename + "_st" + ext):
    img.thumbnail((100, 75), Image.ANTIALIAS)
    img.save(basename + "_st" + ext, "JPEG")
  # prep the names for use
  thm = basename + '_t' + ext
  sthm = basename + '_st' + ext  
  print "    {\n        image:'/art/resource/auroral_resources/chapman2011/" + thm +\
  "',\n        link:'/art/resource/auroral_resources/chapman2011/" + imgname +\
  "',\n        thumb:'/art/resource/auroral_resources/chapman2011/" + sthm +\
  "',\n        title:'" + metaTitle[imgname] +\
  "',\n        description:'" + metaDescr[imgname] +\
  "'\n    },\n"
  if re.match(initialImage,imgname):
    iInitial = i
  i+=1

print "];\n"
print "var initialIndex = " + str(iInitial) + ";"
