# Hero Section Specification

## Overview
- **Target file**: `src/components/Hero.tsx`
- **Interaction model**: Static with entrance animation
- **Screenshot**: `docs/design-references/desktop.png` (Top section)

## DOM Structure
- `div` (Outer container with double border)
  - `pre` (ASCII Art container)
  - `div` (Subtitle / Tagline)

## Computed Styles (exact values)

### Container
- display: flex
- flexDirection: column
- alignItems: center
- justifyContent: center
- backgroundColor: #030405
- border: 3px double #00FF9C
- padding: 40px
- gap: 24px
- width: 100%
- maxWidth: 800px
- margin: 40px auto
- boxShadow: 0 0 15px rgba(0, 255, 156, 0.2)

### ASCII Art (pre)
- color: #00FF9C
- fontFamily: "JetBrains Mono", monospace
- fontSize: 14px
- lineHeight: 1.2
- whiteSpace: pre

### Subtitle
- fontSize: 20px
- fontWeight: 700
- color: #00FF9C
- letterSpacing: 1px
- textTransform: uppercase
- fontFamily: "JetBrains Mono", monospace

## States & Behaviors

### Entrance Animation
- **Trigger**: Page load
- **Animation**: Fade-in and slide-up
- **Duration**: 0.8s
- **Easing**: ease-out

## Text Content (verbatim)
ASCII Art:
░░  ░     ░░░░░░░    ░       ░░░░ ░    ░░░░░░░░    ░
 ░  ░ ░     ░      ░  ░       ░     ░    ░░     ░░   ░
▒    ▒▒     ▒▒▒▒▒   ▒▒        ▒     ▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒  ▒
▒▒▒▒▒▒▒     ▒▒▒▒▒   ▒▒        ▒     ▒▒▒▒▒▒▒▒▒▒▒ ▒  ▒▒▒
▓    ▓▓     ▓      ▓  ▓       ▓     ▓    ▓▓     ▓   ▓▓
▓    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ▓       ▓▓▓▓ ▓    ▓▓▓▓▓▓▓▓    ▓

Subtitle: "Senior Web3 Developer's Portfolio"

## Responsive Behavior
- **Mobile (390px)**: Padding reduces to 20px, ASCII art scales down or wraps (handle with `overflow-x-auto` or `text-[10px]`).
