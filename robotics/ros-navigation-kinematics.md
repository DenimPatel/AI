# ROS: Navigation: Kinematics

*April 15, 2017 · Navigation, ROS*

---

In today's post we will discuss the kinematic model of the differential wheel mobile robot in greater detail.
> We took 2 cases
>
> - only straight motion
> - only rotation

Now it's time to generalize the motion model for any motion in plane. (aka inverse-kinematic model)
![Screenshot from 2017-04-15 15:14:53](https://roboticswithdenim.wordpress.com/wp-content/uploads/2017/04/screenshot-from-2017-04-15-151453.png)
> The **algorithm** can be written as
> Get Distance travelled Left Encoder
> Get Distance travelled Right Encoder
> if (left Dist == right Dist)
> {
>  **pos\_x = prev\_x + left\_dist cos (current angle)**
> **pos\_y = prev\_y + left\_dist sin(current angle)**
> }
> else
> {
> **delta angle =  ( left Dist - right Dist )  /   Width**
> **current angle = angle + delta angle**
> **pos\_x = prev\_x +  (left\_dist + right\_dist )/  2  \*  cos (current angle)**
> **pos\_y = prev\_y + (left\_dist + right\_dist )/  2  \*  sin(current angle)**
> }
> start again

Using the Above mentioned algorithm you can make a code by yourself that can be estimate the Odometry of the Robot.
So using this, we can estimate  the position of the robot. in other term we can say it as feedback.
But to drive the Robot, we need just opposite (aka kinematics) to this algorithm that can send the motor command according to the given velocity like,
Case 1.) go straight
It should send the same velocity command to both the motor.
Case 2.) rotate only
It should send the same velocity with opposite direction.
> Now we will generalize the command given to the motor left and right.
> **vel\_left =  linear velocity  + angular velocity part**
> **vel\_right =  linear velocity  - angular velocity part**
> **angular velocity part =  ( angular velocity / width )**

By implementing this algorithm we can have the code that can send the lower level velocity command to the motors to reach to the desired position.
here the "Velocity Motion Model"  is described and in robotics generally this is used. You can make the "Displacement Motion Model" too with the same algorithm by feeding the displacement data instead of velocity.


---

[← Back to Robotics](index.md)
