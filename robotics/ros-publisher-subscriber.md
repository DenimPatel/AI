# ROS: Publisher & Subscriber

*April 14, 2017 · ROS*

---

This post is very crucial as far as learning of ROS is concerned. You will be doing this thing a lot while developing the Robotic system on ROS.
Let's directly jump to the content.
> In this post we are going to make 2 *Nodes.*
>
> 1. first Node will send the data
> 2. second Node will  receive that data

![2 nodes](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/04/2-nodes1.jpg)We can make 2 Nodes in any language. (C++ or python). For convenience we will be using the same example given in the ROS wiki Page.
> To learn we will make
>
> - **Talker Node ( C++)**
> - **Listener Node (Python)**

Let's start.

## **1.) Talker Node**

in **beginner\_tutorials/src** folder add ***new document** by right click and rename it**talker.cpp***
Put the following code inside it.
```cpp
#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>
/**
 * This tutorial demonstrates simple sending of messages over the ROS system.
 */
int main(int argc, char **argv)
{
  /**
   * The ros::init() function needs to see argc and argv so that it can perform
   * any ROS arguments and name remapping that were provided at the command line.
   * For programmatic remappings you can use a different version of init() which takes
   * remappings directly, but for most command-line programs, passing argc and argv is
   * the easiest way to do it.  The third argument to init() is the name of the node.
   *
   * You must call one of the versions of ros::init() before using any other
   * part of the ROS system.
   */
  ros::init(argc, argv, "talker");
  /**
   * NodeHandle is the main access point to communications with the ROS system.
   * The first NodeHandle constructed will fully initialize this node, and the last
   * NodeHandle destructed will close down the node.
   */
  ros::NodeHandle n;
  /**
   * The advertise() function is how you tell ROS that you want to
   * publish on a given topic name. This invokes a call to the ROS
   * master node, which keeps a registry of who is publishing and who
   * is subscribing. After this advertise() call is made, the master
   * node will notify anyone who is trying to subscribe to this topic name,
   * and they will in turn negotiate a peer-to-peer connection with this
   * node.  advertise() returns a Publisher object which allows you to
   * publish messages on that topic through a call to publish().  Once
   * all copies of the returned Publisher object are destroyed, the topic
   * will be automatically unadvertised.
   *
   * The second parameter to advertise() is the size of the message queue
   * used for publishing messages.  If messages are published more quickly
   * than we can send them, the number here specifies how many messages to
   * buffer up before throwing some away.
   */
  ros::Publisher chatter_pub = n.advertise<std_msgs::String>("chatter", 1000);
  ros::Rate loop_rate(10);
  /**
   * A count of how many messages we have sent. This is used to create
   * a unique string for each message.
   */
  int count = 0;
  while (ros::ok())
  {
    /**
     * This is a message object. You stuff it with data, and then publish it.
     */
    std_msgs::String msg;
    std::stringstream ss;
    ss << "hello world " << count;
    msg.data = ss.str();
    ROS_INFO("%s", msg.data.c_str());
    /**
     * The publish() function is how you send messages. The parameter
     * is the message object. The type of this object must agree with the type
     * given as a template parameter to the advertise<>() call, as was done
     * in the constructor above.
     */
    chatter_pub.publish(msg);
    ros::spinOnce();
    loop_rate.sleep();
    ++count;
  }
  return 0;
}
```
 
The code is almost self explanatory, but for more details  go to [this link.](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28c%2B%2B%29)
After that add this two lines into CMakeLists.txt
```bash
add_executable(talker src/talker.cpp)

target_link_libraries(talker ${catkin_LIBRARIES})
```

## **1.) Listener Node**

in **beginner\_tutorials/scripts** folder add ***new document** by right click and rename it****listener.py***
Put the following code inside it.
```
#!/usr/bin/env python
import rospy
from std_msgs.msg import String
def callback(data):
    rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
def listener():
    # In ROS, nodes are uniquely named. If two nodes with the same
    # node are launched, the previous one is kicked off. The
    # anonymous=True flag means that rospy will choose a unique
    # name for our 'listener' node so that multiple listeners can
    # run simultaneously.
    rospy.init_node('listener', anonymous=True)
    rospy.Subscriber("chatter", String, callback)
    # spin() simply keeps python from exiting until this node is stopped
    rospy.spin()
if __name__ == '__main__':
    listener()
```
In case of Python we don't need to add lines like c++ in CMakeLists.txt.
Make sure that both the created files have permission of execution as executable in the previous Post.( Every time you will have to make sure this thing while making any project.)
Now Build the Package.
```bash
$ cd ~/catkin_ws

$ catkin_make
```

### **Now Run the Nodes**

In different Terminals open
```bash
$ roscore
```
&
```bash
$ rosrun beginner_tutorials talker
```
&
```bash
$ rosrun beginner_tutorials listener.py
```
you will see the data generated by the talker node is transferred to the listener node.
Let's examine the current things running.
```bash
$ rosnode list
```
[ *nodes "Talker" and "Listener" will be added to the list]*
```bash
$ rostopic list
```
[ *topic  "chatter" will be added to the list]*
```bash
$ rostopic echo /chatter
```
[the content of the data will be displayed]
```bash
$ rxgraph
```
[It will displays a graph of the ROS nodes that are currently running, as well as the ROS topics that connect them.]
more commands you can learn from [ROS Cheat Sheet](http://www.tedusar.eu/files/summerschool2013/ROScheatsheet.pdf).
In next post we will learn about services.


---

[← Back to Robotics](index.md)
