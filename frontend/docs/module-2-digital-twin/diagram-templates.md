# Diagram Templates for Physics Simulation

## Purpose
This document provides templates and guidelines for creating conceptual diagrams used in Module 2 chapters on physics simulation.

## Diagram Categories

### 1. Force and Motion Diagrams
Template for illustrating forces acting on objects:
- Use arrows to show direction and relative magnitude
- Label forces (gravity, friction, normal force, etc.)
- Include coordinate system (x, y, z axes)
- Show before/after states when relevant

### 2. Collision Sequence Diagrams
Template for showing collision events:
- "Before" state: Objects approaching
- "During" state: Contact moment
- "After" state: Post-collision results
- Use consistent colors and symbols

### 3. Center of Mass Illustrations
Template for center of mass concepts:
- Show object shape with CoM marked
- Include coordinate system
- Demonstrate how CoM changes with configuration
- Use consistent notation (red dot or cross)

### 4. Physics Parameter Diagrams
Template for showing physics properties:
- Mass distribution
- Inertia tensors
- Friction coefficients
- Use clear labeling and consistent styling

## Visual Standards

### Colors
- Red: Forces, critical points
- Blue: Motion vectors
- Green: Safe/normal states
- Yellow: Warning/caution areas
- Black: Object outlines

### Notation
- Arrows: Direction of motion or force
- Dashed lines: Trajectory paths
- Solid lines: Object boundaries
- Dotted lines: Hidden features

### Consistency
- Same scale across related diagrams
- Consistent symbol usage
- Clear, readable labels
- Appropriate level of detail for educational content

## Example Diagram Structure

```
[Diagram Title]
[Visual Representation with labels]
[Caption explaining what the diagram illustrates]
[Learning point or key takeaway]
```

## Quality Criteria

### Educational Value
- Diagrams must enhance understanding
- Avoid visual clutter
- Focus on one concept per diagram
- Use analogies when helpful

### Technical Accuracy
- Represent physics principles correctly
- Use appropriate scale relationships
- Show realistic scenarios
- Avoid misleading representations

### Accessibility
- Sufficient color contrast
- Clear labeling
- Alternative text descriptions
- Compatible with screen readers

## File Format Recommendations
- SVG for scalable vector graphics
- PNG for complex images
- Maintain high resolution (300 DPI minimum)
- Keep file sizes reasonable (&lt;2MB per image)

## Integration with Markdown
Use the following format in chapter files:

```markdown
![Diagram description](./assets/diagram-name.svg)

*Figure X: Caption explaining the diagram and its relevance to the content.*
```

## Common Physics Simulation Diagrams

### Gravity and Motion
- Free fall trajectory
- Projectile motion
- Pendulum motion
- Inclined plane

### Collision Detection
- Sphere-sphere collision
- Box-box collision
- Mesh collision
- Contact points

### Rigid Body Dynamics
- Rotational motion
- Torque application
- Joint constraints
- Linkage systems

### Sensor Simulation
- LiDAR point cloud
- Camera field of view
- IMU orientation
- Sensor placement on robot

These templates ensure consistency across all Module 2 chapters while maintaining educational clarity.