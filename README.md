# PortfolioForge: A Dynamic Portfolio Builder

Welcome to PortfolioForge! This isn't just a static portfolio website; it's a powerful, fully-featured portfolio management system built with a modern, full-stack technology set. It provides a complete admin panel that allows you to update every aspect of your public-facing portfolio without ever needing to touch the code.

This project was built collaboratively in Firebase Studio.

## Key Features

### Comprehensive Admin Panel
A secure, two-step admin dashboard is the heart of this application. It gives you complete control over your portfolio's content.
- **Secure Login:** Two-step access (secret code + credentials) to the admin area.
- **Live Preview:** Instantly preview your public portfolio from the admin panel before your changes go live.
- **Content Management:** Dedicated pages to manage:
    - **Profile:** Your name, role, tagline, and profile picture.
    - **About Me:** Your biography and key highlights.
    - **Skills:** Organize skills by category (Frontend, Backend, etc.).
    - **Projects:** Showcase your work with images, descriptions, tech stacks, and links.
    - **Experience:** Detail your professional work history.
    - **Education:** List your academic background.
    - **Contact:** Update your email, phone, and social media links.

### Appearance Customization
- **Theme Engine:** A dedicated "Appearance" page in the admin panel to change the entire site's look and feel.
- **Accent Colors:** Choose from a curated palette of accent colors to instantly update buttons, links, and highlights.
- **Background Gradients:** Select from a variety of beautiful, pre-designed background gradients, each with unique light and dark mode variants.
- **Light/Dark Mode:** A seamless theme switcher for user preference.

### AI-Powered Assistance
- **Tagline Suggestions:** Utilizes **Genkit** and the Gemini AI model to suggest creative and professional taglines for your profile based on your name, role, and skills.

### Modern & Animated UI
- **Professional Design:** Built with **ShadCN UI** components and **Tailwind CSS** for a clean, modern, and aesthetically pleasing interface.
- **Responsive Layout:** The entire application, from the public portfolio to the admin panel, is fully responsive and optimized for desktop, tablet, and mobile devices.
- **Subtle Animations:** Smooth page transitions, animated section titles with shimmer effects, and other micro-interactions create a polished user experience.

## Tech Stack

This project leverages a modern, type-safe, and performant tech stack.

- **Framework:** [**Next.js**](https://nextjs.org/) (with App Router)
- **Language:** [**TypeScript**](https://www.typescriptlang.org/)
- **Styling:** [**Tailwind CSS**](https://tailwindcss.com/)
- **UI Components:** [**ShadCN UI**](https://ui.shadcn.com/)
- **State Management:** [**Zustand**](https://zustand-demo.pmnd.rs/) (for global portfolio state)
- **Form Handling:** [**React Hook Form**](https://react-hook-form.com/) with [**Zod**](https://zod.dev/) for validation
- **AI Integration:** [**Genkit**](https://firebase.google.com/docs/genkit) (with the Google AI plugin for Gemini)
- **Database:** [**Firebase Firestore**](https://firebase.google.com/docs/firestore) (for storing portfolio data)
- **Icons:** [**Lucide React**](https://lucide.dev/)
- **Image Hosting (Optional):** Integrated with Cloudinary for dynamic image uploads.

## Deployment

Your portfolio is ready to be deployed on the web. For detailed instructions on how to get your site live, please refer to the `DEPLOYMENT_GUIDE.md` file included in this project.
