# FundMe - MERN Fundraising Platform

## Features
- Roles: Admin, Fundraiser, Donor
- Fundraiser registration, dashboard, file uploads, bank onboarding
- Donor: browse, donate, comment, heart reaction
- Admin dashboard: approve/reject fundraisers
- Real-time updates (WebSockets)
- JWT authentication
- Responsive, modern UI (React + Tailwind/MUI)
- SEO meta tags
- Error handling, secure env vars

## Setup
1. Clone repo
2. Add `.env` files in backend and frontend
3. Install dependencies:
   - Backend: `npm install`
   - Frontend: `npm install`
4. Start backend: `npm run dev`
5. Start frontend: `npm start`

## API Docs
See `postman_collection.json` for all endpoints.

## Deployment
- Use environment variables for secrets
- Use production build for frontend
- Secure MongoDB, JWT, Cloudinary, Stripe keys

## License
MIT
