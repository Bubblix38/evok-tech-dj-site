# 90s Music Pack Website - EVOK TECH DJ

## Overview

This is a modern web application for showcasing and distributing 90s-style music packs from EVOK TECH DJ. The platform features a nostalgic design inspired by retro gaming aesthetics and music streaming platforms like Spotify/Bandcamp. Users can browse featured music packs, preview tracks, and download digital music collections with a focus on remixed 90s classics and modern beats.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system supporting dark/light themes
- **State Management**: TanStack Query (React Query) for server state management
- **Design System**: Custom 90s-inspired theme with Orbitron and Inter fonts, purple/golden color palette

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with schema-first approach
- **Data Storage**: In-memory storage implementation (MemStorage) with interface for easy database switching
- **API Design**: RESTful API endpoints for music pack CRUD operations
- **Development**: Hot module replacement with Vite integration

### Data Models
- **Users**: Basic user management with username/password authentication
- **Music Packs**: Core entity containing title, artist, cover art, tracks, genre, size, release date, and download information
- **Schema**: Shared TypeScript types between client and server using Zod validation

### Key Features
- **Music Pack Management**: Browse, search, and filter music packs
- **Audio Preview System**: Built-in audio player for track previews
- **Download System**: Direct file downloads for purchased packs
- **Featured Content**: Highlighting promoted music packs
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Theme System**: Dark/light mode toggle with CSS custom properties

### Component Architecture
- **Layout Components**: Header with navigation, Footer with brand info and links
- **Music Components**: PackGrid for displaying collections, MusicPackCard for individual items
- **Media Components**: AudioPlayer with playback controls and progress tracking
- **UI Components**: Comprehensive Shadcn/ui component library with custom theming
- **Communication**: WhatsApp integration for customer contact

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL) with connection pooling
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS for processing
- **Build Tools**: Vite for development and production builds, ESBuild for server bundling
- **Validation**: Zod for runtime type checking and schema validation

### Frontend Libraries
- **State Management**: TanStack Query for caching and synchronization
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Media**: Embla Carousel for content carousels
- **Utilities**: Class Variance Authority for component variants, clsx for conditional classes
- **Date Handling**: date-fns for date manipulation and formatting

### Development Tools
- **TypeScript**: Full type safety across client, server, and shared code
- **Drizzle Kit**: Database migrations and schema management
- **Replit Integration**: Development environment with error overlay and debugging tools

### Third-Party Integrations
- **WhatsApp Business**: Direct customer communication channel
- **Google Fonts**: Orbitron and Inter font families for typography
- **Static Assets**: Local file serving for music files, images, and downloadable content

### Deployment Architecture
- **Development**: Vite dev server with Express backend integration
- **Production**: Static file serving with Express server for API endpoints
- **Assets**: Organized structure for music files, images, and downloadable packs
- **Environment**: Environment variable configuration for database and external services