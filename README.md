# KS TV ScoreBoard 🏀⚽

A modern web application for creating and managing real-time sports scoreboards with OBS integration, user management, and payment system. Built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## 🌟 Features

### Core Features
- **Real-time Score Updates**: Live score changes with automatic browser refresh
- **OBS Integration**: Dedicated URLs for OBS browser sources
- **Modern TV-style Designs**: Two beautiful scoreboard variants (Classic & Modern)
- **User Management**: Registration, authentication, and role-based access control
- **Payment System**: Premium upgrades with admin approval workflow
- **Admin Dashboard**: Complete management interface for users, matches, and payments

### Scoreboard Features
- **Multiple Sports Support**: Configurable for any sport
- **Team Management**: Home and away team names and scores
- **Design Variants**: Choose between Classic and Modern layouts
- **Responsive Design**: Works on all devices and screen sizes
- **OBS Ready**: Optimized for streaming software integration

### User Features
- **User Dashboard**: Manage your scoreboards and view payment status
- **Create Scoreboards**: Easy form to create new scoreboards
- **Real-time Management**: Update scores in real-time from any device
- **Billing Management**: Request premium upgrades and view payment history
- **Share URLs**: Get unique URLs for OBS integration

### Admin Features
- **User Management**: View all users, manage roles, and track activity
- **Match Management**: Oversee all scoreboards and matches
- **Payment Management**: Approve or reject payment requests
- **System Statistics**: Overview of platform usage and revenue

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Vercel-compatible)
- **Authentication**: NextAuth.js with credentials provider
- **Deployment**: Vercel optimized configuration
- **Styling**: Tailwind CSS v4 with modern design system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/7AlexZm7/kstv-scoreboard.git
   cd kstv-scoreboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Set up the database**
   ```bash
   # Using Docker (recommended)
   docker-compose up -d
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kstv_scoreboard?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

## 🏗️ Project Structure

```
kstv-scoreboard/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── admin/         # Admin panel
│   │   └── scoreboard/    # Public scoreboard display
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and configuration
│   └── types/            # TypeScript definitions
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## 📱 Usage

### For Users
1. Register an account
2. Create a new scoreboard
3. Get the OBS URL for streaming
4. Manage scores in real-time
5. Request premium upgrade if needed

### For Admins
1. Access the admin panel
2. Manage user accounts and roles
3. Approve payment requests
4. Monitor system usage

### For OBS Integration
1. Copy the scoreboard URL from your dashboard
2. Add a Browser Source in OBS
3. Paste the URL and set dimensions
4. The scoreboard will update in real-time

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Scoreboards
- `GET /api/scoreboards` - Get user's scoreboards
- `POST /api/scoreboards` - Create new scoreboard
- `GET /api/scoreboards/[id]` - Get specific scoreboard
- `PATCH /api/scoreboards/[id]` - Update scoreboard
- `DELETE /api/scoreboards/[id]` - Delete scoreboard

### Admin
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/[id]` - Update user role
- `GET /api/admin/matches` - Get all matches
- `DELETE /api/admin/matches/[id]` - Delete match
- `GET /api/admin/payments` - Get all payments
- `PATCH /api/admin/payments/[id]` - Update payment status

### Payments
- `POST /api/payments/create` - Create payment request
- `GET /api/payments/user` - Get user's payments

## 🎨 Scoreboard Designs

### Classic Design
- Traditional sports scoreboard look
- Bold team names and scores
- Clean, professional appearance

### Modern Design
- Contemporary minimal design
- Smooth animations and transitions
- Gradient backgrounds and modern typography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🎯 Roadmap

- [ ] Multiple sport templates
- [ ] Team logo upload
- [ ] Advanced statistics
- [ ] Live commentary integration
- [ ] Mobile app companion
- [ ] WebSocket real-time updates
- [ ] Custom CSS themes
- [ ] Multi-language support

---

Built with ❤️ by the KS TV Team