# Footer Specification

## Overview
- **Target file**: `src/components/Footer.tsx`
- **Interaction model**: Static bottom bar
- **Screenshot**: `docs/design-references/desktop.png` (Very bottom)

## DOM Structure
- `footer` (Container)
  - `div` (Left: Copyright & Year)
  - `div` (Right: Version tag)

## Computed Styles (exact values)

### Container
- backgroundColor: #030405
- borderTop: 1px solid #00FF9C
- padding: 24px 110px
- display: flex
- justifyContent: space-between
- alignItems: center
- color: #A1A1AA
- fontFamily: "JetBrains Mono", monospace
- fontSize: 14px

### Version Tag
- backgroundColor: rgba(0, 255, 156, 0.1)
- color: #00FF9C
- padding: 4px 12px
- borderRadius: 9999px
- border: 1px solid rgba(0, 255, 156, 0.2)

## States & Behaviors
- **Static**: No major interactions.

## Responsive Behavior
- **Mobile**: Stacks or centers elements. Padding reduces to 20px.
