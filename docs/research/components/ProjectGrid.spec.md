# Project Grid Specification

## Overview
- **Target file**: `src/components/ProjectGrid.tsx`
- **Interaction model**: Hover-active cards with link to detail
- **Screenshot**: `docs/design-references/full_page.png` (Referencing the grid from the Projects page)

## DOM Structure
- `section` (Grid container)
  - `h2` (Section title: "Featured Projects")
  - `div` (Grid layout)
    - `div` (Project card)
      - `div` (Image container)
      - `div` (Content: Title, Tags, Description)
      - `div` (Links: Live Demo, Code)

## Computed Styles (exact values)

### Grid Container
- display: grid
- gridTemplateColumns: repeat(2, 1fr) (Mobile: 1fr)
- gap: 32px
- padding: 60px 0

### Project Card
- backgroundColor: #0B0E0E
- border: 1px solid #00FF9C
- borderRadius: 0px
- overflow: hidden
- transition: all 0.3s ease

#### Hover State
- boxShadow: 0 0 20px rgba(0, 255, 156, 0.3)
- transform: translateY(-4px)

### Image Container
- width: 100%
- aspectRatio: 16 / 9
- backgroundColor: #1A1D1D
- borderBottom: 1px solid #00FF9C

### Project Title
- color: #00FF9C
- fontSize: 24px
- fontWeight: 700
- margin: 16px

### Tags
- display: flex
- gap: 8px
- margin: 0 16px 16px

#### Tag Item
- fontSize: 12px
- padding: 2px 8px
- borderRadius: 4px
- border: 1px solid currentColor

## States & Behaviors
- **Hover**: Card lifts and glows.
- **Buttons**: Secondary button (Code) has a terminal-style icon.

## Responsive Behavior
- **Mobile**: Collapses to a single column.
