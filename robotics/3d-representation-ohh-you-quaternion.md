# 3D representation? Ohh, YOU QUATERNION!!

*April 14, 2020 · Quaternions*

---

Here I am going to provide a short summary of How/ Why quaternion helps in 3D rotation representation. Here I tried to provide bits that are necessary and required when you are using them as a tool. I hope you find it useful.

There are many ways to represent 3D rotations.

1. **Rotation Matrix (3x3)**
2. **Euler Angles**
3. **Rotation vectors**
4. **Quaternions**

In Rotation Matrix, we use total 9 values to represent 3 rotations. Huh!! too much redundancy!!

- ![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/3d.png?w=498)

In Euler Angles we represent rotation as 3 consecutive rotations in ZYX in most cases(First rotate w.r.t. x then y and then z). This representation has a problem of gimbal lock!!

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/euler.png?w=300)

In rotation vectors we represent rotation using 4 values, 3 to represent axis of rotation and 1 to represent the angle of rotation.

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/vector.png?w=633)

It is found out that **it is not possible to represent 3D rotation with only 3 parameters without any singularity!**

This is somewhat similar to using two coordinates to represent the Earth’s surface (such as longitude and latitude), and there will be singularity (longitude is meaningless when latitude is ±90◦.

If you recall, we used complex numbers to represent vector in 2D and also complex number can be used to represent 2D rotation. For example, multiplying a complex number by i means 90 degree counter-clockwise rotation.

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/com-1.png?w=220)

Quaternion uses the same approach as complex numbers to represent orientation in 3D. Quaternions do have real and imaginary part. Quaternions is represented as follows.

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/quater.gif?w=300)

Quaternion has one real part and 3 imaginary part which is represented as
 a0 + a1 i + a2 j + a3 k

Or as q = [s, v] where s represent scalar: a0 and v represent vector[a1, a2, a3].

If the imaginary part of a quaternion is 0 , it is called real quaternion. Conversely, if its real part is 0 , it is called imaginary quaternion.

as in complex number we use unit vector [cos(a) + i sin(a)] to represent orientation, unit quaternion is used to represent 3D orientation.

Now let's define some quaternion operations which is quite useful while dealing quaternion.

**Addition and Subtraction** The addition and subtraction of the quaternion qa, qb is:

qa = sa + xa i + ya j + za k, qb = sb + xb i + yb j + zb k
qa ± qb =[sa ± sb, va ± vb]

**Multiplication** Multiplication is the multiplication of each item of qa with each item of qb.

qa \* qb = sasb − xaxb − yayb − zazb
+ (saxb + xasb + yazb − zayb)i
+ (sayb − xazb + yasb + zaxb)j
+(sazb +xayb −yaxb +zasb)k

**Length**. The length of a quaternion is defined as:

∥qa∥ = sqrt(sa\*\*2 + xa\*\*2 + ya\*\*2 + za\*\*2)

**Conjugate**. The conjugate of a quaternion is to take the imaginary part as the opposite:

qa\* =sa − xa i − ya j − za k = [sa, −va] .

**Inverse**. The inverse of a quaternion is:

q\_inv = q\_conjugate / length(q) = q\_inv = q\* /∥q∥

**Scalar Multiplication**. Similar to vectors, quaternions can be multiplied by numbers:

kq = [ks, kv]

**Here comes the best part of the quaternion!! orientation representation!!**

let's say q represents quaternion representation of rotation. and we have point P = [x, y, z] and we want to find out the new point after rotation P'.

P' = q \* P \* q\_inv

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/quat.jpg?w=512)

Please not that, this multiplication here is quaternion multiplication which is defined as follows.

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/screen-shot-2020-04-14-at-5.06.58-pm.png?w=1013)

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/screen-shot-2020-04-14-at-5.15.59-pm.png?w=462)

Now the P' can be calculated as:

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/screen-shot-2020-04-14-at-5.17.19-pm.png?w=536)

Now we can perform matrix multiplication as follows and we get:

![](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/screen-shot-2020-04-14-at-5.19.08-pm.png?w=1024)

when we multiply the above matrix with P, we get P'. Note that only bottom right part contributes to answer. so let us call bottom right 3x3 matrix as R.

so P' = R \* P where \* is simple matrix multiplication.
 ![undefined](https://roboticswithdenim.wordpress.com/wp-content/uploads/2020/04/screen-shot-2020-04-14-at-5.21.47-pm.png)

Now, we can covert quaternion q to R. But how to convert R to q?

qw= √(1 + r00 + r11 + r22) /2
qx = (r21 - r12)/( 4 \*qw)
qy = (r02 - r20)/( 4 \*qw)
qz = (r10 - r01)/( 4 \*qw)

The conversion from one from of rotation representation to another is non-trivial but properly defined. Just to give you an example, you can convert quaternion into rotation vector representation as follows:

θ = 2 arccos q0
[nx, ny, nz] =[q1,q2,q3] / sin(θ/2)

OKAY!! I get it. but how to use quaternion and all this into C++ ??

ANS: Use **Eigen geometry module.**

 #include<Eigen/Core>
 #include<Eigen/Geometry>
 using namespace Eigen;

*and then in main function:*Matrix3d rotation\_matrix = Matrix3d::Identity();
AngleAxisd rotation\_vector(M\_PI / 4, Vector3d(0, 0, 1));
**// conversion of orientation representation**rotation\_matrix = rotation\_vector.toRotationMatrix();

**// define quaternion using R**Quaterniond q = Quaterniond(rotation\_vector);
Vector3d v(1, 0, 0);
Vector3d V\_rotated = q \* v; // it's overloaded operator

I hope you like the short summary writing on 3D representation using quaternion. Let me know if you find any mistakes/errors.


---

[← Back to Robotics](index.md)
