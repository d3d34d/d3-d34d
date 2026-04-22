# Header Specification

## Overview
- **Target file**: `src/components/Header.tsx`
- **Interaction model**: Sticky with backdrop blur
- **Screenshot**: `docs/design-references/desktop.png` (Top section)

## DOM Structure
- `header` (Sticky container)
  - `div` (Left: Terminal path)
  - `nav` (Center: Navigation links)
  - `div` (Right: Status indicator)

## Computed Styles (exact values)

### Container
- position: sticky
- top: 0
- height: 76px
- backgroundColor: rgba(3, 4, 5, 0.85)
- backdropFilter: blur(10px)
- borderBottom: 1px solid #00FF9C
- zIndex: 50
- display: flex
- alignItems: center
- justifyContent: space-between
- padding: 0 110px (Responsive: 20px on mobile)

### Terminal Path (Left)
- color: #00FF9C
- fontFamily: "JetBrains Mono", monospace
- fontSize: 14px
- content: "alex.chen@portfolio:~$"

### Nav Links (Center)
- display: flex
- gap: 24px
- color: #00FF9C
- fontFamily: "JetBrains Mono", monospace
- fontSize: 14px
- textTransform: lowercase

#### Active State
- backgroundColor: #00FF9C
- color: #030405
- borderRadius: 4px
- padding: 4px 8px

### Status Indicator (Right)
- display: flex
- alignItems: center
- gap: 8px
- color: #00FF9C
- fontSize: 14px

#### Dot
- width: 8px
- height: 8px
- borderRadius: 50%
- backgroundColor: #00E3FF
- boxShadow: 0 0 8px #00E3FF

## States & Behaviors
- **Sticky**: Header stays at top.
- **Hover**: Links slightly brighten.
- **Scroll**: Background opacity might increase slightly (optional).

## Responsive Behavior
- **Mobile**: Padding decreases, terminal path might be hidden or shortened.
