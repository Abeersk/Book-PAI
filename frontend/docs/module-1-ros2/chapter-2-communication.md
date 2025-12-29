<a id="module-1-ros-2-nodes"></a>
# Chapter 2: Nodes, Topics, and Services: The Building Blocks

## Understanding ROS 2 Architecture

ROS 2 (Robot Operating System 2) provides a flexible framework for building robotic applications through a distributed computing architecture. At its core, ROS 2 uses a peer-to-peer network of processes called "nodes" that communicate with each other using standardized interfaces. This architecture enables complex robotic systems to be built from modular, reusable components that can run on the same computer or be distributed across multiple machines.

Think of ROS 2 architecture like a city's infrastructure: nodes are like different buildings or facilities (hospitals, schools, government offices), topics and services are like the roads and communication networks that connect them, and messages are like the people, goods, and information that flow between them. Just as a city functions more efficiently when its components are well-connected and communicate effectively, a robot operates more effectively when its software components can share information seamlessly.

### The Node Concept

A **node** is the fundamental unit of computation in ROS 2. It's an executable process that performs specific functions within the robotic system. Nodes can represent:

- **Sensor drivers**: Processes that interface with physical sensors like cameras, LiDAR, or IMUs
- **Controller modules**: Processes that send commands to robot actuators
- **Processing units**: Processes that perform computations like image processing or path planning
- **User interfaces**: Processes that enable human-robot interaction

Each node runs independently and communicates with other nodes through messages. This design allows for fault isolation—if one node fails, other nodes can continue operating, and the system can implement graceful degradation strategies.

## Communication Patterns in ROS 2

ROS 2 provides two primary communication patterns that serve different purposes in robotic systems:

### Publish-Subscribe Pattern (Topics)

The publish-subscribe pattern is used for **one-to-many** or **many-to-many** communication where data flows continuously from publishers to subscribers. This pattern is ideal for:

- **Sensor data distribution**: A camera node publishes images that multiple processing nodes can consume
- **Robot state broadcasting**: A robot state publisher shares joint positions that controllers, visualizers, and loggers can all use
- **Event notifications**: A node can publish events that trigger responses from multiple other nodes

**Key characteristics:**
- **Asynchronous**: Publishers and subscribers don't need to be synchronized
- **Decoupled**: Publishers don't know who subscribes to their data
- **Real-time friendly**: Messages are delivered as they become available
- **Data-driven**: Communication is triggered by new data availability

### Client-Server Pattern (Services)

The client-server pattern is used for **request-response** communication where a client sends a request and expects a specific response. This pattern is ideal for:

- **Actionable commands**: Requesting a specific computation or action with a guaranteed response
- **Configuration changes**: Requesting changes to system parameters
- **Synchronous operations**: Operations that must complete before the client continues

**Key characteristics:**
- **Synchronous**: The client waits for a response
- **Reliable**: Requests and responses are guaranteed to be delivered
- **Action-oriented**: Used for specific tasks rather than continuous data flow
- **Blocking**: The client is blocked until the response is received

## Detailed Look at Topics

### Topic Architecture

Topics in ROS 2 follow a **data-centric** approach where communication is organized around specific types of information rather than specific nodes. Each topic has:

**A name**: A unique identifier within the ROS 2 domain (e.g., `/camera/image_raw`, `/cmd_vel`, `/robot_state`)

**A message type**: A standardized format that defines the structure and data types of messages published to the topic

**Quality of Service (QoS) settings**: Configurable parameters that determine delivery guarantees, such as reliability, durability, and deadline requirements

### Publishers and Subscribers

**Publishers** are nodes that send data to topics. They:
- Create a publisher object for a specific topic
- Prepare messages in the correct format
- Call the publish() method to send messages
- Don't need to know how many subscribers exist

**Subscribers** are nodes that receive data from topics. They:
- Create a subscription to a specific topic
- Register a callback function that processes incoming messages
- Don't need to know how many publishers exist

### Quality of Service (QoS) in Topics

QoS settings allow nodes to specify their communication requirements:

**Reliability**: Choose between "reliable" (all messages delivered) or "best effort" (messages delivered if possible, suitable for sensor data where some loss is acceptable)

**Durability**: Choose between "transient local" (late-joining subscribers receive the last message) or "volatile" (new subscribers only receive future messages)

**History**: Specify how many messages to store for delivery to late joiners

**Rate**: Control the frequency of message delivery

## Detailed Look at Services

### Service Architecture

Services in ROS 2 follow a **request-response** model where:

**Service Definition**: A standardized format that defines both the request message and the response message

**Service Server**: A node that implements the service and responds to requests

**Service Client**: A node that calls the service and waits for a response

### Service Types and Usage

Common service types in robotics include:

**Action services**: Perform specific actions like "move to position" or "grasp object"

**Configuration services**: Change system parameters or settings

**Query services**: Request specific information like "get robot status" or "list available tools"

**Management services**: Control system state like "start", "stop", or "reset"

## Practical Examples in Humanoid Robotics

### Example 1: Sensor Data Distribution

In a humanoid robot, multiple nodes need access to camera data:

```
Camera Driver Node
       ↓ (publishes to /camera/image_raw)
┌─────────────────┐
│   Topic:        │
│ /camera/image_raw│
└─────────────────┘
       ↑ (multiple subscribers)
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Object      │    │ Face        │    │ Navigation  │
│ Detection   │    │ Recognition │    │ Mapping     │
└─────────────┘    └─────────────┘    └─────────────┘
```

This architecture allows each processing node to operate independently while consuming the same sensor data. If the face recognition node crashes, object detection and navigation mapping can continue operating.

### Example 2: Action Request System

When a humanoid robot needs to perform a specific action:

```
High-Level Planner Node
        ↓ (service request)
┌─────────────────────┐
│ Service:            │
│ /robot/perform_grasp│
│ Request: grasp      │
│ object at [x,y,z]   │
└─────────────────────┘
        ↑ (service response)
Arm Controller Node
```

The service call ensures that the grasp action is completed before the planner continues with the next step.

## Advanced Communication Concepts

### Actions

For long-running operations that require feedback, ROS 2 provides **actions**, which combine the benefits of both topics and services:

- **Goal**: The request to start a long-running operation
- **Feedback**: Continuous updates on the operation's progress
- **Result**: The final outcome when the operation completes

Actions are perfect for tasks like navigation ("go to goal") or complex manipulations ("assemble object") where you need to know both that the task is progressing and when it completes.

### Parameters

ROS 2 also provides a parameter system that allows nodes to share configuration values:

- **Dynamic reconfiguration**: Parameters can be changed at runtime without restarting nodes
- **Hierarchical organization**: Parameters can be organized in namespaces
- **Type safety**: Parameters have specific data types (int, float, string, bool, lists)
- **Persistence**: Parameters can be saved and loaded from configuration files

## Design Principles and Best Practices

### Loose Coupling

ROS 2's architecture promotes loose coupling between nodes:

- **Topic-based communication**: Nodes communicate through well-defined topics rather than direct function calls
- **Message-based interfaces**: Communication happens through standardized message formats
- **Discovery-based**: Nodes automatically discover each other at runtime
- **Language agnostic**: Nodes can be written in different programming languages

### Single Responsibility

Each node should have a clear, single purpose:

- **Modularity**: Makes debugging and testing easier
- **Reusability**: Nodes can be reused in different robotic applications
- **Maintainability**: Changes to one node don't affect others
- **Scalability**: New capabilities can be added by creating new nodes

### Real-time Considerations

When designing ROS 2 communication patterns:

- **Message frequency**: Balance information needs with computational load
- **QoS settings**: Choose appropriate reliability and durability settings
- **Data size**: Consider the impact of large messages on network performance
- **Synchronization**: Use appropriate patterns for time-critical operations

## Integration with Humanoid Robot Systems

### Sensor Integration

Humanoid robots typically have many sensors that need to be integrated:

- **Synchronized topics**: Multiple sensor streams that need temporal alignment
- **Transforms**: Coordinate systems that relate different sensor frames
- **Fusion nodes**: Processes that combine multiple sensor inputs
- **Filtering**: Processing to remove noise and outliers

### Control Architecture

Communication patterns support hierarchical control:

- **High-level planning**: Service calls to set goals and objectives
- **Mid-level coordination**: Topic-based sharing of planned trajectories
- **Low-level control**: Fast topic-based communication with actuators
- **Feedback loops**: Continuous monitoring of system state

## Troubleshooting and Debugging

### Common Issues

- **Topic mismatches**: Publishers and subscribers using different message types
- **Timing issues**: Subscribers not receiving messages due to startup timing
- **Network configuration**: Nodes on different machines not discovering each other
- **Performance bottlenecks**: Too many messages overwhelming the system

### Debugging Tools

ROS 2 provides tools to understand communication:

- **ros2 topic list**: See all active topics
- **ros2 node list**: See all active nodes
- **ros2 topic echo**: Monitor messages on a topic
- **ros2 node info**: See what topics a node publishes/subscribes to

## Conclusion

The communication patterns provided by ROS 2—topics for continuous data flow and services for request-response interactions—form the foundation of modern robotic systems. Understanding these patterns is crucial for building robust, maintainable robotic applications.

The publish-subscribe model enables loose coupling and scalability, while the client-server model provides reliable, synchronous communication when needed. Together, they create a flexible architecture that can accommodate the complex coordination requirements of humanoid robots.

In the next chapter, we'll explore how these communication patterns bridge the gap between AI systems and robotic hardware, enabling intelligent robots that can perceive, reason, and act in the physical world.