# 🎬 ReelPilot

**Automate Your Social Media Videos with Visual Workflows**

ReelPilot is a powerful automation platform that lets you schedule and post videos to Facebook using an intuitive visual workflow editor. No coding required!

![ReelPilot Banner](https://img.shields.io/badge/ReelPilot-Automate%20Social%20Media-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React Flow](https://img.shields.io/badge/React%20Flow-11.11-purple?style=for-the-badge)

## ✨ Features

### 🎯 Visual Workflow Builder
- **Drag & Drop Interface** - Build automation workflows visually
- **Node-Based System** - Connect Facebook Pages, Video Sources, and Captions
- **Real-Time Preview** - See your workflow as you build it

### 📹 Smart Video Management
- **Video Queue System** - Manage multiple videos per workflow
- **Custom Captions** - Add unique captions for each video
- **Default Captions** - Set global captions with hashtags
- **Chain Captions** - Combine custom + default captions automatically

### ⚡ Powerful Automation
- **Scheduled Posting** - Set custom intervals (1min - 2hrs)
- **24/7 Automation** - Runs continuously in the background
- **Multi-Workflow Support** - Create unlimited workflows
- **Facebook Integration** - Direct posting via Facebook Graph API

### 🎨 Modern UI/UX
- **Dark Theme** - Beautiful dark mode interface
- **Responsive Design** - Works on all screen sizes
- **Toast Notifications** - Clean, non-intrusive alerts
- **Real-Time Logs** - Monitor automation activity

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Facebook Page Access Token

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NiloyChowdhuryVR/ReelPilot.git
cd ReelPilot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1. Create a Workflow
- Click "New Workflow" in the sidebar
- Give your workflow a name

### 2. Add Nodes
Drag and drop nodes from the sidebar:
- **Facebook Page** - Your Facebook page credentials
- **Video Source** - URLs of videos to post
- **Default Caption** - Global caption/hashtags (optional)

### 3. Connect Nodes
- Connect Page → Video Source
- Connect Page → Default Caption (optional)

### 4. Configure
- **Page Node**: Add your Facebook Page ID and Access Token
- **Video Node**: Add video URLs and custom captions
- **Caption Node**: Set default hashtags/captions

### 5. Start Automation
- Set your posting interval
- Click "Start Automation"
- Watch the magic happen! ✨

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Workflow Editor**: [React Flow](https://reactflow.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Database**: [Prisma](https://www.prisma.io/) + SQLite
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📁 Project Structure

```
ReelPilot/
├── app/
│   ├── api/              # API routes
│   │   ├── scheduler/    # Automation scheduler
│   │   ├── workflow/     # Workflow CRUD
│   │   └── page/         # Facebook page verification
│   ├── workflow/         # Workflow editor page
│   └── page.tsx          # Landing page
├── components/
│   ├── Flow/             # React Flow components
│   │   └── nodes/        # Custom node types
│   ├── Layout.tsx        # Main layout wrapper
│   ├── Topbar.tsx        # Top navigation
│   ├── Sidebar.tsx       # Node palette
│   ├── StatusLog.tsx     # Automation logs
│   └── Scheduler.tsx     # Background scheduler
├── store/
│   └── workflowStore.ts  # Zustand state management
└── prisma/
    └── schema.prisma     # Database schema
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./prisma/dev.db"
```

## 🎯 Roadmap

- [ ] Instagram integration
- [ ] Twitter/X support
- [ ] AI-powered caption generation
- [ ] Video analytics dashboard
- [ ] Team collaboration features
- [ ] Cloud storage integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Niloy Chowdhury**
- GitHub: [@NiloyChowdhuryVR](https://github.com/NiloyChowdhuryVR)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Workflow visualization powered by [React Flow](https://reactflow.dev/)
- Icons by [Lucide](https://lucide.dev/)

---

<div align="center">
  <strong>⭐ Star this repo if you find it useful!</strong>
  <br/>
  <sub>Built with ❤️ for content creators</sub>
</div>
