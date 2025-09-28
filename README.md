# ALFA LEARNING - Static Website

This is the static HTML version of the ALFA LEARNING website, converted from the original Next.js application for easy deployment.

## 📁 File Structure

```
alfa-learning-static/
├── index.html          # Homepage
├── about.html           # About page
├── classes.html         # Classes/Courses page
├── teachers.html        # Teachers/Careers page
├── contact.html         # Contact page
├── styles.css           # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Deployment Options

### 1. GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify
1. Drag and drop the `alfa-learning-static` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be deployed instantly with a random URL
3. You can customize the domain in your Netlify dashboard

### 3. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the folder: `cd alfa-learning-static`
3. Run: `vercel`
4. Follow the prompts to deploy

### 4. Traditional Web Hosting
1. Upload all files to your web hosting provider's public folder
2. Usually this is named `public_html`, `www`, or `htdocs`
3. Your site will be available at your domain

## ✨ Features

- **Fully Responsive**: Works on desktop, tablet, and mobile devices
- **Modern Design**: Clean, professional interface with smooth animations
- **Interactive Forms**: Contact forms with validation and feedback
- **Fast Loading**: Optimized for performance with CDN resources
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Accessible**: Built with accessibility best practices

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks, pure JS for interactivity
- **Lucide Icons**: Beautiful icon set (via CDN)
- **Google Fonts**: Geist font family

## 🔧 Customization

### Colors and Branding
- Edit the CSS variables in `styles.css` to change the color scheme
- Replace the gradient colors in the HTML files for different branding

### Content
- Edit the HTML files directly to change text content
- Update contact information in all pages as needed
- Modify the course offerings in `classes.html`

### Functionality
- Form handling is currently simulated - integrate with your backend
- Contact forms can be connected to services like Formspree or Netlify Forms
- Add Google Analytics by including the tracking code in each HTML file

## 📞 Contact Information

Current contact details in the website:
- **Email**: Enrol.AlfaLearning@gmail.com
- **WhatsApp**: +62 877 7277 6761
- **Location**: International Online Platform

## 🎨 Design Features

- Gradient backgrounds and modern card designs
- Smooth hover animations and transitions
- Mobile-first responsive design
- Professional typography with good readability
- Consistent spacing and visual hierarchy

## 📈 Performance

- Uses CDN for external resources (Tailwind CSS, Lucide Icons, Google Fonts)
- Minimal JavaScript for optimal loading speed
- Optimized images and icons
- Clean, semantic HTML structure

## 🔐 Security

- No server-side dependencies
- Pure static files
- Forms include basic client-side validation
- HTTPS ready for secure deployment

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

---

**Note**: Remember to update contact information, pricing, and course details according to your current offerings before deploying to production.