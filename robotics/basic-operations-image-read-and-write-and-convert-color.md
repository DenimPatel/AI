---
layout: robotics-article
title: "Basic Operations: Image read and write and convert color"
date_label: "March 11, 2019"
category: "Computer Vision"
---

This blog aims to provide some basic operations on any image to make it ready to use it in your project as you want it.

The first thing we learn is, what is image?

### **Image is a visual representation visual information.**

Image can be of many types:

- **Black and White image**
  - any pixel can only store 0 or 1 at particular location
  - 0: black dot(pixel)
  - 1: white dot(pixel)

![Image result for pure black and white image](https://i1.wp.com/foothillart.org/wp-content/uploads/2010/03/sfm_300_37-copy.jpg?resize=854%2C450)

B&W image

- **Gray-scale image**
  - In this case, Image pixel can have the intermediate intensity between black and white.
  - let's say you have 8 bit grayscale image then image intensity at any pixel value can be between 0 to 255 value
  - 0: black
  - 255: white

![Image result for grayscale image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlh1iosLv2j0PdpACMQZ3pDuBqpaB7eiXMPLOEK7OttC9-xNkk)

Grayscaled Mona lisa

**Colored image**

- In colored Image, any pixel can have it's own color intensity
- colored image have 3 color channels namely Red, Green and blue.
- by combining these three colors in different proportion, one can produce almost any color as these are the fundamental colors.

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2019/03/image.jpeg)

colored mona lisa

In computer vision the preferred programming language is Python and OpenCV is the most used computer vision related library used.

To work on any project our first goal would be to get(read) the image. once you have the image then only you can perform any task you want on image.

I'll recommend you to have a look at this [GitHub Notebook](https://github.com/DenimPatel/ComputerVision/blob/master/%5B1%5D%20Basic%20operations%20on%20Image/%5B1%5D%20convert%20color%20image%20to%20gray%20scale.ipynb) with the same content as discussed in this blog to understand it better.

In OpenCV you can read the image with one liner command:

First import the library:

```python
import cv2
```

```python
image_color = cv2.imread('monalisa.jpg')
```

Now "image" stores the pixel wise and channel wise data from image.

You can even read the image using **matplotlib**

```
image_color = mpimg.imread('monalisa.jpg')
```

Note that matplotlib stores the pixel values in RGB sequence and cv2 stores pixel values in BGR sequence.

Now, you can convert this image into gray-scale with the following command:

```python
image_gray = cv2.cvtColor(image_color, cv2.COLOR_BGR2GRAY)
```

And to show this image back to user you can use OpenCV or matplotlib

```python
plt.imshow(image_gray, cmap = 'gray')
or
cv2.imshow("gray-scaled image of monalisa",image_gray)
```

I would recommend you to use jupyter notebook to play with this one liners as it is really the efficient way to learn these small small things.

plt.imshow is useful to show the images on notebook itself whereas cv2.imshow is recommended for actual python code.

Also, it is needed to save image once you have performed operations you wanted to perform on it.

```python
cv2.imwrite("gray_mona.jpg", image_gray)
```

Above line will save grayscaled image into the same folder with the name "gray\_mona"

