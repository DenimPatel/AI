---
layout: robotics-article
title: "ROS: Create & Build Package"
date_label: "March 28, 2017"
category: "ROS"
---

As you know that Package is the main building block for any Project you do in ROS.

In last Post, we created a workspace named "catkin\_ws".

Let's understand the structure of package.

![kkas](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/kkas.png)

Just have a look. we are going to understand about it in a detail later.

To make the package, run the following command.

```bash
$ cd ~/catkin_ws/src
```

[command to change the working directory to "src"]

```bash
$ catkin_create_pkg beginner_tutorials std_msgs rospy roscpp
```

[command to create package of name "beginner\_tutorials" with the dependencies "std\_msgs", "rospy" & "roscpp". Adding the dependencies at this moment is optional.The name of the package is same as in roswiki for the readers convenience]

Now you will see the folder created in your "catkin\_ws/src" folder named "beginner\_tutorials".

Now go to the "root" folder of the workspace and "build" the package.

In **new terminal(Ctrl + Alt +T)**,run the following command

```bash
$ cd ~/catkin_ws

$ catkin_make
```

Your package package will look like this.

![bt](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/bt1.png)

lets learn about the components of Packages.

## *Package.xml*

> This file defines properties about the package such as the package name, version numbers, authors, maintainers, and dependencies on other packages.

Open "Package.xml", and modify the file as per your wish.

```bash
  beginner_tutorials
  0.1.0
  The beginner_tutorials package
  Your Name
  BSD
  http://wiki.ros.org/beginner_tutorials
  Jane Doe
  catkin
  roscpp
  rospy
  std_msgs
  roscpp
  rospy
  std_msgs
```

## CMakeLists.txt

This file is most important file in the package. This package guides ROS at the time of building the package.
CMakeLists.txt contains the data about

- Packages required to build this package
- Msg/Service/Action generator
- libraries/ executables to build

As we need , we will learn more about CMakeLists.txt
> **src: directory contains C/C++ codes**
>
> **scripts: directory contains python codes**

In **new terminal(Ctrl + Alt +T)**,run the following command

```bash
$ cd ~/catkin_ws

$ catkin_make
```

Congratulations! Now you have the fundamental knowledge of the package and also you have your own package to place your codes in.

