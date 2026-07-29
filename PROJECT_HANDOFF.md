# Jyoti Advertisement Project Handoff

## Project Summary
This project is a premium corporate website for Jyoti Advertisement Agency built with React + Vite. The site includes multi-page navigation, responsive layouts, service and infrastructure sections, shared header/footer, contact form integration, newsletter signup, and a shared popup feedback experience.

## What Was Completed
- Built a multi-page React website with routing using React Router.
- Designed and polished the home, about, services, infrastructure, testimonials, career, and contact pages.
- Implemented a responsive layout for desktop and mobile devices.
- Added a shared header and footer across the site.
- Styled service cards, office grids, hero sections, footer forms, and page sections.
- Integrated EmailJS so the contact form and newsletter signup submit successfully.
- Replaced browser alerts with a shared custom popup modal.
- Added popup behavior for success and error states with outside-click close support.
- Ensured the project builds successfully with Vite.

## Main Project Files
- package.json — project scripts and dependencies
- index.html — Vite entry HTML page
- vite.config.js — Vite configuration
- src/App.jsx — main app structure, routes, page components, forms, modal logic
- src/styles.css — all site styling and responsive rules
- src/data.js — shared company content and navigation data
- public/ — static assets served publicly by Vite

## Project Data File Details
The main content data is stored in:
- src/data.js

This file contains shared company information used throughout the site, including:
- company name
- slogan
- description
- email
- phone numbers
- navigation links
- page content such as about, services, infrastructure, career, and testimonials

## Important Notes
- The app uses React Router for page navigation.
- The app uses EmailJS for form submissions.
- The popup modal is implemented in the app root and is shared between the contact form and newsletter signup.
- Static assets such as images should be placed in the public folder for direct access via absolute paths.

## Next Prompt Starting Point
The next prompt can continue from here by:
1. Reviewing the existing structure in src/App.jsx and src/styles.css.
2. Extending the current website with new features or refinements.
3. Updating content in src/data.js for company information changes.
4. Adding or adjusting assets in public/.

## Build Status
The project was successfully built with Vite using:
- npm install
- npm run build

This handoff is intended to help the next prompt understand the current state of the project and continue development smoothly.
