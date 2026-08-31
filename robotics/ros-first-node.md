---
layout: robotics-article
title: "ROS: First Node"
date_label: "April 11, 2017"
category: "ROS"
---

let's start making the "hello world" example.
In this blog we are going to make a *Node*. very Simple *Node*.
It wont be doing any interactive thing but will provide the good understanding about *Node*.
First we will make *Node* using C++ language.
> ### **Procedure of making the *Node* (c++)**
>
> 1. in **Package\_name/src** folder add ***new document** by right click and rename it **node\_name.cpp***
> 2. **write code**
> 3. mention the file into **Cmakelists.txt**
> 4. build package/workspace ***"catkin\_make"***
> 5. node is ready to use

## 1.) blank document

in **beginner\_tutorials/src** folder add ***new document** by right click and rename it **hello\_world.cpp***

## 2.) write code

```cpp
#include "ros/ros.h"
/**
 * This tutorial demonstrates simplest node running on the ROS system.
 */
int main(int argc, char **argv)
{
  ros::init(argc, argv, "talker");
  ros::NodeHandle n;
  ros::Rate loop_rate(10);
  while (ros::ok())
  {
    ROS_INFO("hello world");

    loop_rate.sleep();
  }
  return 0;
}
```
This *Node prints the info"Hello world" On the terminal window.*
Now let's understand the first code.

```cpp
#include "ros/ros.h" //must required header file for every ROS node
```
main loop starts
```
  ros::init(argc, argv, "first_node");          //node name is "first_node"
  ros::NodeHandle n;
```
[ These two lines you will be writing in each code of node. Just keep in mind that they initializes the node with the provided name and assigns node handle for the internal requirements of ROS environment.]
```
 ros::Rate loop_rate(10);                    //node update frequncy 10 Hz
```
[code will be executed with the prescribed frequency]
```
 while (ros::ok())                          // continuous loop
  {
    ROS_INFO("hello world");            //info displayed

    loop_rate.sleep();                      //wait
  }
```

[loop continuously]

The five different [verbosity levels](http://wiki.ros.org/Verbosity%20Levels) are, in order:

- DEBUG
- INFO
- WARN
- ERROR
- FATAL

as per the need to display the state, verbosity level can be chosen.
> //Note:
> [ after saving the file right click on document Go to the permissions tab, then tick the box `Execute: [ ] Allow executing file as program.]

## 3.) Cmakelists.txt editing

Now we have the file **"hello\_world.cpp"**
open file Cmakelists.txt and add these two lines
```bash
add_executable(hello_world src/hello_world.cpp)

target_link_libraries(hello_world ${catkin_LIBRARIES})
```

## 4.) Building the Package

In **new terminal(Ctrl + Alt +T)**,run the following command
```bash
$ cd ~/catkin_ws

$ catkin_make
```

## 5.) Running the *Node*

```bash
$ roscore
```

in new terminal
```bash
$ rosrun beginner_tutorials hello_world
```

You will see terminal same as below.
![Screenshot from 2017-04-11 20:07:38](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/04/screenshot-from-2017-04-11-200738.png)
you can press **Ctrl + C to stop the N*ode***
yeah! we just created and run the node.
Now let's learn something that will be very helpful in future to understand and the debug the current ROS system.
```bash
$ rostopic list
```

[It will list all the topics currently available on ROS system]

```bash
$ rosnode list
```

[It will list all the topics currently available on ROS system]

That's all. From Next post we will do message passing using Publisher and subscriber.

