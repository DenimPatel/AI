# ROS: Server and Client

*April 14, 2017 · ROS*

---

We learnt Publisher and subscriber in the previous post.
At this moment you have basic knowledge of what client and server is.
So let's start!
We will take an example of adding two integers using the client and server method.
> In this post also we will make two *nodes*.
>
> - Define service
> - Client *node*
> - Server *node*

Any node can be written in any language. So for learning we choose
client (c++)   &      server (python)

## **1.) Service**

Message: In ROS we can define the service as per the requirement.
> Service body will have two parts
>
> - Request
> - Response

In **beginner\_tutorials** make a new directory **srv**. In **srv**directory add **new document** and **rename** it to AddTwoInts.srv
```
int64 A

int64 B

---

int64 Sum
```

As discussed above, file will have two components. First for service and second for response.
Add the following two lines into Package.xml
```xml
 <build_depend>message_generation</build_depend>

  <run_depend>message_runtime</run_depend>
```

 
Add dependencies in CMakeLists.txt also.
```bash
find_package(catkin REQUIRED COMPONENTS

  roscpp

  rospy

  std_msgs

 message_generation

)
```
make sure you also mention the following lines into CMakeLists.txt.
```
add_service_files(

  FILES

  AddTwoInts.srv

)
```

## 2.)Client *node*

Create the **src/add\_two\_ints\_client.cpp** file and put the following code inside it.
```cpp
#include "ros/ros.h"
#include "beginner_tutorials/AddTwoInts.h"
#include <cstdlib>
int main(int argc, char **argv)
{
  ros::init(argc, argv, "add_two_ints_client");
  if (argc != 3)
  {
    ROS_INFO("usage: add_two_ints_client X Y");
    return 1;
  }
  ros::NodeHandle n;
  ros::ServiceClient client = n.serviceClient<beginner_tutorials::AddTwoInts>("add_two_ints");
  beginner_tutorials::AddTwoInts srv;
  srv.request.a = atoll(argv[1]);
  srv.request.b = atoll(argv[2]);
  if (client.call(srv))
  {
    ROS_INFO("Sum: %ld", (long int)srv.response.sum);
  }
  else
  {
    ROS_ERROR("Failed to call service add_two_ints");
    return 1;
  }
  return 0;
}
```
Add the following lines to CMakeLists.txt.
```bash
add_executable(add_two_ints_client src/add_two_ints_client.cpp)
target_link_libraries(add_two_ints_client ${catkin_LIBRARIES})
add_dependencies(add_two_ints_client beginner_tutorials_gencpp)
```

## 3.)Server *node*

create the **scripts/add\_two\_ints\_server.py** and put the following code inside it.
```
#!/usr/bin/env python
from beginner_tutorials.srv import *
import rospy
def handle_add_two_ints(req):
    print "Returning [%s + %s = %s]"%(req.a, req.b, (req.a + req.b))
    return AddTwoIntsResponse(req.a + req.b)
def add_two_ints_server():
    rospy.init_node('add_two_ints_server')
    s = rospy.Service('add_two_ints', AddTwoInts, handle_add_two_ints)
    print "Ready to add two ints."
    rospy.spin()
if __name__ == "__main__":
    add_two_ints_server()
```
Now make sure that all the files you added have the permission to run as executable and  build the package using catkin\_make.
Thats all.
Let's run the *Nodes. [ First run the server]*
```bash
$  rosrun beginner_tutorials add_two_ints_server.py
```
```bash
$  rosrun beginner_tutorials add_two_ints_client 5 10
```
Now just observe the output of these two terminals.


---

[← Back to Robotics](index.md)
