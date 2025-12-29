# Visual Diagrams and Flowcharts for Module 1: The Robotic Nervous System (ROS 2)

## Diagram 1: ROS 2 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        ROS 2 ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Node A    │    │   Node B    │    │   Node C    │         │
│  │             │    │             │    │             │         │
│  │ • Publisher │    │ • Subscriber│    │ • Service   │         │
│  │ • Service   │    │ • Publisher │    │ • Client    │         │
│  │ • Client    │    │ • Parameter │    │ • Subscriber│         │
│  └─────────────┘    │ • Timer     │    └─────────────┘         │
│         │            └─────────────┘            │               │
│         │                    │                  │               │
│         └────────────────────┼──────────────────┘               │
│                              │                                  │
│                    ┌─────────────────┐                          │
│                    │   DDS Layer     │                          │
│                    │ (Data Distribution│                         │
│                    │  Service)       │                         │
│                    └─────────────────┘                          │
│                              │                                  │
│                    ┌─────────────────┐                          │
│                    │   RMW Layer     │                          │
│                    │ (ROS Middleware │                         │
│                    │  Wrapper)       │                         │
│                    └─────────────────┘                          │
│                              │                                  │
│                    ┌─────────────────┐                          │
│                    │   Transport     │                          │
│                    │   Network       │                         │
│                    │   (TCP/UDP)     │                         │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

## Diagram 2: Topic-Based Communication Pattern

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Publisher     │ -> │     Topic       │ -> │   Subscriber    │
│   Node          │    │   /sensor_data  │    │   Node          │
│                 │    │                 │    │                 │
│  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │
│  │ Message   │  │    │  │ Message   │  │    │  │ Callback  │  │
│  │ Generator │  │    │  │ Buffer    │  │    │  │ Handler   │  │
│  └───────────┘  │    │  │           │  │    │  └───────────┘  │
│       │         │    │  │           │  │    │       │         │
│       ▼         │    │  │           │  │    │       ▼         │
│  ┌───────────┐  │    │  │           │  │    │  ┌───────────┐  │
│  │ Publish   │  │ -> │  │           │  │ -> │  │ Process   │  │
│  │ Message   │  │    │  │           │  │    │  │ Message   │  │
│  └───────────┘  │    │  │           │  │    │  └───────────┘  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                        ┌─────────────────┐
                        │   ROS 2         │
                        │   Communication │
                        │   Infrastructure│
                        └─────────────────┘
```

## Diagram 3: Service-Based Communication Pattern

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client        │    │   Service       │    │   Server        │
│   Node          │    │   Request       │    │   Node          │
│                 │    │   /robot_action │    │                 │
│  ┌───────────┐  │    │                 │    │  ┌───────────┐  │
│  │ Request   │  │    │  ┌───────────┐  │    │  │ Process   │  │
│  │ Generator │  │ -> │  │ Request   │  │ -> │  │ Request   │  │
│  └───────────┘  │    │  │ Queue     │  │    │  │ & Send    │  │
│       │         │    │  │           │  │    │  │ Response  │  │
│       ▼         │    │  │           │  │    │  └───────────┘  │
│  ┌───────────┐  │    │  │           │  │    │       │         │
│  │ Send      │  │ -> │  │           │  │ <- │  ┌───────────┐  │
│  │ Request   │  │    │  │           │  │ <- │  │ Response  │  │
│  └───────────┘  │    │  │           │  │    │  │ Generator │  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                        ┌─────────────────┐
                        │   Synchronous   │
                        │   Communication │
                        │   Infrastructure│
                        └─────────────────┘
```

## Diagram 4: Humanoid Robot Kinematic Tree Structure

```
                    ┌─────────────────┐
                    │   base_link     │
                    │   (Root)        │
                    └─────────────────┘
                           │
                    ┌─────────────────┐
                    │   torso_link    │
                    └─────────────────┘
                     │              │
        ┌─────────────┘              └─────────────┐
        │                                          │
┌─────────────────┐                        ┌─────────────────┐
│   head_link     │                        │   pelvis_link   │
└─────────────────┘                        └─────────────────┘
        │                                          │
┌─────────────────┐                        ┌─────────────────┐
│   camera_link   │                        │   left_hip_link │
└─────────────────┘                        └─────────────────┘
                                            │              │
                               ┌─────────────┘              └─────────────┐
                               │                                          │
                    ┌─────────────────┐                        ┌─────────────────┐
                    │ left_thigh_link │                        │right_thigh_link │
                    └─────────────────┘                        └─────────────────┘
                               │                                          │
                    ┌─────────────────┐                        ┌─────────────────┐
                    │left_lower_leg_  │                        │right_lower_leg_ │
                    │     link        │                        │     link        │
                    └─────────────────┘                        └─────────────────┘
                               │                                          │
                    ┌─────────────────┐                        ┌─────────────────┐
                    │  left_foot_link │                        │ right_foot_link │
                    └─────────────────┘                        └─────────────────┘
                               │                                          │
                    ┌─────────────────┐                        ┌─────────────────┐
                    │ left_shoulder_  │                        │right_shoulder_  │
                    │     link        │                        │     link        │
                    └─────────────────┘                        └─────────────────┘
                     │              │                           │              │
        ┌────────────┘              └────────────┐    ┌────────┘              └────────┐
        │                                        │    │                                  │
┌─────────────────┐                        ┌─────────────────┐    ┌─────────────────┐
│left_upper_arm_  │                        │left_forearm_    │    │right_upper_arm_ │
│     link        │                        │     link        │    │     link        │
└─────────────────┘                        └─────────────────┘    └─────────────────┘
        │                                        │                        │
┌─────────────────┐                        ┌─────────────────┐    ┌─────────────────┐
│ left_hand_link  │                        │ left_hand_link  │    │right_hand_link  │
└─────────────────┘                        └─────────────────┘    └─────────────────┘
        │                                        │                        │
┌─────────────────┐                        ┌─────────────────┐    ┌─────────────────┐
│ finger_joints   │                        │ finger_joints   │    │ finger_joints   │
└─────────────────┘                        └─────────────────┘    └─────────────────┘
```

## Diagram 5: AI-Robotics Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI-ROBOTICS INTEGRATION                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │   AI Vision     │ -> │  AI Planning    │ -> │  AI Control │ │
│  │   System        │    │  System         │    │  System     │ │
│  │                 │    │                 │    │             │ │
│  │ • Object Det.   │    │ • Path Planning │    │ • Motion    │ │
│  │ • Scene Under.  │    │ • Task Planning │    │   Control   │ │
│  │ • Pose Est.     │    │ • Behavior      │    │ • Safety    │ │
│  └─────────────────┘    │   Selection     │    │   Monitor   │ │
│         │                └─────────────────┘    └─────────────┘ │
│         │                        │                      │       │
│         ▼                        ▼                      ▼       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │  ROS 2 Topics   │ <- │  ROS 2 Services │ -> │ ROS 2       │ │
│  │ • /camera/image │    │ • /move_to_pos  │    │ Parameters  │ │
│  │ • /lidar/scan   │    │ • /grasp_object │    │ • Settings  │ │
│  │ • /robot_state  │    │ • /change_mode  │    │ • Calibrat. │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│         │                        │                      │       │
│         └────────────────────────┼──────────────────────┘       │
│                                  ▼                              │
│                    ┌─────────────────────────┐                  │
│                    │   Robot Hardware        │                  │
│                    │   Interface Layer       │                  │
│                    │                         │                  │
│                    │ • Actuator Drivers      │                  │
│                    │ • Sensor Interfaces     │                  │
│                    │ • Safety Systems        │                  │
│                    │ • Power Management      │                  │
│                    └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

## Diagram 6: URDF Model Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        URDF STRUCTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    ROBOT MODEL                              ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         ││
│  │  │   Link A    │  │   Joint A   │  │   Link B    │         ││
│  │  │             │  │             │  │             │         ││
│  │  │ • Mass: 2kg │  │ • Type: Rev │  │ • Mass: 1kg │         ││
│  │  │ • Inertia   │  │ • Axis: X   │  │ • Inertia   │         ││
│  │  │ • Geometry  │  │ • Limits    │  │ • Geometry  │         ││
│  │  │ • Material  │  │ • Dynamics  │  │ • Material  │         ││
│  │  └─────────────┘  └─────────────┘  └─────────────┘         ││
│  │         │                 │                 │               ││
│  │         └─────────────────┼─────────────────┘               ││
│  │                           │                                 ││
│  │  ┌─────────────────────────────────────────────────────────┐││
│  │  │                    COLLISION &                          │││
│  │  │                    VISUAL GEOMETRY                      │││
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │││
│  │  │  │  Collision  │  │   Visual    │  │  Material   │     │││
│  │  │  │   Mesh      │  │   Mesh      │  │   Colors    │     │││
│  │  │  │  (Simple)   │  │  (Detailed) │  │  & Textures │     │││
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘     │││
│  │  └─────────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Diagram 7: Communication QoS Settings

```
┌─────────────────────────────────────────────────────────────────┐
│                    QoS POLICY OPTIONS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RELIABILITY POLICY:                                           │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   RELIABLE      │    │  BEST_EFFORT    │                    │
│  │                 │    │                 │                    │
│  │ • All messages  │    │ • Deliver when  │                    │
│  │   delivered     │    │   possible      │                    │
│  │ • Acknowledgment│    │ • No guarantee  │                    │
│  │   required      │    │   required      │                    │
│  │ • Higher latency│    │ • Lower latency │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                 │
│  DURABILITY POLICY:                                            │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ TRANSIENT_LOCAL │    │    VOLATILE     │                    │
│  │                 │    │                 │                    │
│  │ • Keep history  │    │ • No history    │                    │
│  │ • Late joiners  │    │ • New subs      │                    │
│  │   receive last  │    │   only get      │                    │
│  │   message       │    │   new msgs      │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                 │
│  HISTORY POLICY:                                               │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │    KEEP_ALL     │    │   KEEP_LAST     │                    │
│  │                 │    │                 │                    │
│  │ • Store all     │    │ • Store N last  │                    │
│  │   messages      │    │   messages      │                    │
│  │ • Higher mem    │    │ • Lower mem     │                    │
│  │   usage         │    │   usage         │                    │
│  └─────────────────┘    └─────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

## Diagram 8: Hierarchical Planning Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HIERARCHICAL PLANNING                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    TASK PLANNING                            ││
│  │  High-Level Goals: "Navigate to Kitchen", "Pick Up Mug"     ││
│  │  Input: Mission objectives, current state, environment map  ││
│  │  Output: Sequence of high-level actions                     ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  MOTION PLANNING                            ││
│  │  Mid-Level Goals: "Plan path to object", "Calculate grasp"  ││
│  │  Input: Task sequence, robot model, obstacle map            ││
│  │  Output: Trajectories, waypoints, joint configurations       ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                TRAJECTORY EXECUTION                         ││
│  │  Low-Level Goals: "Execute joint movements", "Apply forces" ││
│  │  Input: Trajectories, real-time sensor feedback            ││
│  │  Output: Motor commands, force control, balance corrections ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   ROBOT CONTROL                             ││
│  │  Hardware Goals: "Drive motors", "Monitor sensors",         ││
│  │  "Ensure safety"                                            ││
│  │  Input: Motor commands, safety constraints                  ││
│  │  Output: Actual robot motion and interaction                ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```