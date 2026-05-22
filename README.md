# Starlfinx E-commerce Platform

Production-grade React 18 e-commerce application with full-stack features.

## Features

- **Product Management**: Browse, search, filter products with responsive grid layout
- **Admin Mode**: Create, edit, delete products with form validation (React Hook Form + Yup)
- **Shopping Cart**: Add items, update quantities, real-time price calculations
- **Coupon System**: Apply discount coupons with validation and expiry checks
- **Authentication**: JWT-based login/signup with protected routes
- **Checkout**: Full order flow with delivery form and order summary
- **Responsive Design**: Mobile-first Tailwind CSS (no inline styles)

## Tech Stack

- **React 18**: Functional components, hooks
- **Redux Toolkit**: State management (products, cart, auth, coupons)
- **React Router v6**: Client-side routing with protected routes
- **React Hook Form + Yup**: Form validation
- **Axios**: HTTP client with JWT interceptors
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool

## Installation

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── redux/            # Redux slices and store
├── hooks/            # Custom hooks
├── services/         # API services
├── routes/           # Router configuration
└── utils/            # Helper utilities
```

## Key Features

### 1. Product CRUD
- List products with search/filter
- View detailed product page
- Admin panel to create/edit/delete products
- Async thunks with loading and error states

### 2. Shopping Cart
- Add/remove items
- Update quantities (1-99)
- Real-time price calculation with taxes
- Persistent cart state

### 3. Coupon Management
- Apply discount coupons
- Validate by code, expiry, minimum cart value
- Show discount immediately on cart
- Remove coupons

### 4. Authentication
- JWT-based login/signup
- Protected routes (cart, checkout)
- Token refresh and expiry handling
- Auto-logout on 401

### 5. Responsive UI
- Mobile-first design
- Tailwind CSS utilities
- Spinner/skeleton loading states
- Empty state messages

## Mock Data

The app includes:
- **8 mock products** across 4 categories
- **3 coupon codes**: SAVE10 (10% off), FLAT100 (₹100 flat), NEWUSER (15% off)
- **Mock user**: demo@starlfinx.com / demopass

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Component Architecture

All custom hooks wrap Redux logic:
- `useCart()`: Cart state and dispatch
- `useAuth()`: Auth state and flows
- `useProducts()`: Product fetching and filtering
- `useCoupon()`: Coupon validation logic

Every component receives props via JSDoc comments. No direct useSelector/useDispatch in pages.
