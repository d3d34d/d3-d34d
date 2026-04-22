# Blog Section Specification

## Overview
- **Target file**: `src/components/Blog.tsx`
- **Interaction model**: Horizontal scroll or vertical list of posts
- **Screenshot**: `docs/design-references/desktop.png` (Bottom section)

## DOM Structure
- `section` (Blog container)
  - `div` (Header: "Latest Blog Posts" + "|")
  - `div` (Description text)
  - `div` (Posts list)
    - `div` (Post card)
      - `div` (Meta: Category, Read time)
      - `h3` (Post title)
      - `p` (Post excerpt)
      - `a` (Read more button)

## Computed Styles (exact values)

### Section Header
- fontSize: 24px
- color: #00FF9C
- fontFamily: "JetBrains Mono", monospace
- marginBottom: 16px

### Cursor (|)
- animation: blink 1s step-end infinite
- color: #00FF9C

### Description
- fontSize: 16px
- color: #A1A1AA
- maxWidth: 800px
- lineHeight: 1.6
- marginBottom: 40px

### Post Card
- border: 1px solid #00FF9C
- padding: 32px
- backgroundColor: transparent
- transition: background-color 0.2s ease

#### Hover State
- backgroundColor: rgba(0, 255, 156, 0.05)

### Meta Row
- display: flex
- justifyContent: space-between
- marginBottom: 24px
- fontSize: 14px

### Read More Button
- border: 1px solid #00FF9C
- color: #00FF9C
- padding: 8px 16px
- display: inline-block
- marginTop: 24px
- textDecoration: none

## States & Behaviors
- **Blinking Cursor**: The "|" after the header blinks.
- **Hover**: Post cards highlight on hover.

## Responsive Behavior
- **Mobile**: Posts stack vertically. Padding reduces.
