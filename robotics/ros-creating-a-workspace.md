# ROS: Creating a Workspace

*March 28, 2017 · ROS*

---

before starting with the example,

**open up Terminal (Ctrl + Alt +T)** and run the following command, that basically installs the basic tutorials for ROS.(It will be used in the future posts.)

```bash
$  sudo apt-get install ros-kinetic-ros-tutorials
```

Also make sure that your ROS Environment is sourced by running.

```bash
$ roscore
```

Command will start Master Node.

Let's make a Workspace.

You probably thinking what is this "Workspace" ? and why we need it?

Simply, workspace is a place(directory) where we can store our packages.

Follow the commands to make a workspace.

```bash
$ mkdir -p ~/catkin_ws/src
```

[Command creates a folder/directory named "catkin\_ws" in home. and also a folder/directory will be created named "src" in "catkin\_ws" directory]

```bash
$ cd ~/catkin_ws/src
```

[command will change our present working directory to home/catkin\_ws/src]

So that we can now work in this "src" directory from terminal.

That's all. We have a Workspace to put our package.

**Remember, we will place our packages in "home/catkin\_ws/src/" directory.**

At this moment we just created a directory. But, when you actually put new package inside the workspace or do changes in the code (in C/C++ code) existing in the workspace, you need to "build" the workspace. And for that

```bash
$ cd ~/catkin_ws/
```

[change the present working directory to "catkin\_ws"]

```bash
$ catkin_make
```

[command to "build" the workspace]

Whenever you use this command to "build" the workspace please make sure that you are in the root folder of your workspace. i.e. catkin\_ws.

Now if you open directory "catkin\_ws" then there will be some newly added folders and you will see your workspace like this.

> - catkin\_ws/
>   - build
>   - devel
>   - src

Now we need to inform ROS that we have some packages into this workspace using the following command.

```bash
$  echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc
```

To make sure that your workspace is properly sourced, run this command. You will see the path to the workspace.

```bash
$ echo $ROS_PACKAGE_PATH
```

Cool!! Now you have a working directory to store your projects.

Just refer the following list of basic commands of Linux that will be very useful for working with the Terminal.

> - **cd** "name of the directory"      #to change the working directory
>
> example: cd catkin\_ws
>
> - **ls**                                                   #to get the content of the directory
> - **pwd**                                             #outputs present working directory
> - **cd**                                                 #changes directory to home
> - **cd ..**                                              #changes directory to

We have some additional commands from ROS as well. You can have a very good summary about it from [ROS Cheat Sheet](http://www.tedusar.eu/files/summerschool2013/ROScheatsheet.pdf).

In next post, we will learn about creating a package inside this newly created workspace.


---

[← Back to Robotics](index.md)
