# Stats Section Specification

## Overview
- **Target file**: `src/components/Stats.tsx`
- **Interaction model**: Static metrics within a featured card
- **Screenshot**: `docs/design-references/full_page.png` (Right side of featured project)

## DOM Structure
- `div` (Stats grid container)
  - `div` (Individual stat card)
    - `span` (Metric value: e.g., 1,252)
    - `span` (Metric label: e.g., Users)

## Computed Styles (exact values)

### Container
- display: grid
- gridTemplateColumns: repeat(2, 1fr)
- gap: 16px
- width: 100%

### Stat Card
- backgroundColor: #0B0E0E
- border: 1px solid rgba(0, 255, 156, 0.2)
- padding: 24px
- display: flex
- flexDirection: column
- alignItems: center
- justifyContent: center
- textAlign: center
- minHeight: 120px

### Metric Value
- color: #00E3FF
- fontFamily: "JetBrains Mono", monospace
- fontSize: 24px
- fontWeight: 700
- marginBottom: 8px

### Metric Label
- color: #A1A1AA
- fontFamily: "JetBrains Mono", monospace
- fontSize: 14px
- textTransform: uppercase

## States & Behaviors
- **Hover**: Subtle glow or border color change to #00FF9C.
- **Counter Animation**: Values could count up on entrance (optional polish).

## Responsive Behavior
- **Mobile**: Stacks to 1 column if space is tight, or scales down.
