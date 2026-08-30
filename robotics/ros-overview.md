# ROS: Overview

*March 27, 2017 · ROS*

---

On internet probably you will find the statement that **"ROS has steep learning rate"**.
And that's true.

Instead, we can learn the each and every components of ROS by exploring them very easily.

So our approach of learning ROS will be **"learning by doing".**

Before we start any example, just few things that you should have in mind while developing project in ROS. And as you work with ROS, you will get familiar with these concepts.  

At this moment we need to learn these 2 things.

- **File system**
- **Computation Level**

# ***1.) File System***

> In layman's Term
>
> **"File system is the method of storing the project On ROS platform directory wise"**

**![file system](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/file-system.png)**

To understand file system and computation level properly, take an example of **Navigation system**.

in any good Navigation system mostly you will have

- wheel Odometry calculation
- input data of sensors like LIDAR or Stereo Cameras
- Map Building
- Localization
- Trajectory Planning
- Trajectory execution

> "You will learn about full navigation system when we discuss SLAM"

### ***Package***

So for this each and every step, we will have one or more codes. If we just put this codes in the random/same dictionary then it will be simply a mess.

No person other than the developer can understand system efficiently.

so, to overcome this problem, In ROS we have "File System".

Now, let's learn about the "package" first. It is the smallest building block of ROS system.

For example we can make "package" that is responsible for "Trajectory Planning". And that package will contain the codes only regarding the "Trajectory Planning".

Package also contains the Manifests file. manifest file gives the idea about the package, its scope, it's Creator/Author, Contact mail Id, Current status and more. Package also contain file Cmakelist but it  is not required to learn it right now.

## *Metapackages*

> "group of packages that  provides some high end functionality,
>
> by merging the results of internal packages"

Now we have many packages, one package is for "Trajectory Planning", another for "Trajectory validation", another for "Trajectory execution". These packages can work simultaneously and/or shares same property or same group.

## *Repository*

> " A bundle of packages and/or metapackages"

Repository is used to share  the packages with others.

# *2.) Computation Level*

> "Method by which the data transfer takes place within ROS"

![computation level](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/computation-level.png)

## *Node*

Node is the basic building block of the computation level.

Remember our example of Navigation stack. Trajectory planning package will generate nodes that is responsible for only "Trajectory Planning".

## *Master*

Master Node is the central authority of ROS system. It basically registers nodes. in simple term, It provides the platform for nodes to work collectively by sending  data between them.

## *Parameter Server*

> " common platform for Nodes to access the parameters of the system "

Example of Parameters of the system can be dimensions of the Robot, type of robot base drive(holonomic or non-holonomic), maximum speed,  acceleration allowed etc.

Parameter Server is a Part of the Master Node. Each and every node will  have the access to Parameter server.
![file system msg](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/file-system-msg.png)

Lets assume Node 1 is responsible for "Trajectory Planning" and Node 2 is responsible for "Trajectory Execution". Now to drive the robot, it is required that the trajectory planned by Node 1 should be transferred to Node 2 for the execution.

In ROS, for Transferring the data "between Nodes" message method is used. We have two type of messages available for data transfer.

![message.png](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/message.png)
We can choose any of the these 2 mode of data transfer based on the requirement.
> Topic: helpful when we want to transfer the data without feedback
>
> Service: helpful when we want data transfer with feedback

In our example of navigation, if we want to transfer the data of IMU (Inertial Measurement Unit) to the Odometry node then we can choose "Topic" method. and for executing the trajectory we can choose "Service".
![message_pass.png](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/03/message_pass.png)

## *Topic*

In  "Topic" method of data transfer, Node 1 will publish the data across the ROS Platform. If Node 2 want to have that data than it just need to subscribe it and it will get the latest data from Node 1.

## *Service*

In "Service" method nodes works as service client and server. Node 1 is "Trajectory Planner", and it invoked the service to execute the trajectory.Node 2 is "trajectory Execution", it will accept to serve the service.It will give feedback to Node 1 about the current status also.
In some cases, service is used to send the command to the robot, like go tho the charging dock, lift the water bottle.
That's all.
This  knowledge is enough for starting.In first go, you won't be able to understand  every concept but you will be having the idea of the terms.
If you want to learn this concepts in greater detail than you can go to this [ROS Wiki page](http://wiki.ros.org/ROS/Concepts).
Now we have the basic knowledge of ROS. From next post, we will dive into ROS with greater detail.


---

[← Back to Robotics](index.md)
