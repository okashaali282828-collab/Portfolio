# Portfolio (React + Vite + Tailwind)

## Setup

```bash
npm install
npm run dev
```

Browser mein `http://localhost:5173` khol lein.

Production build ke liye:

```bash
npm run build
```

## Apna data merge karna

Sara content ek jagah hai: **`src/data.js`**
Isi file mein apna naam, bio, skills, projects, contact text waghera daal dein — baaki poori site automatically update ho jayegi. Design/code chhedne ki zaroorat nahi.

## Apni photos/images lagana

1. Apni images `src/assets/images/` folder mein daal dein.
2. `src/data.js` ke top pe import karein:
   ```js
   import photoUrl from "./assets/images/my-photo.jpg";
   ```
3. Us variable ko relevant field mein use karein (e.g. `photoUrl: photoUrl`).

Filhaal placeholder images (Unsplash links) lagi hain — jab tak aap apni images na dein, wahi dikhengi.

## Folder Structure

```
src/
  data.js              <- YAHAN DATA DAALEIN
  App.jsx              <- sections ko jodta hai
  components/
    Hero.jsx           <- top section (desktop diagonal + mobile)
    Navbar.jsx
    Banner.jsx          <- hero ke neeche dark strip
    About.jsx
    Skills.jsx
    PortfolioSection.jsx
    Contact.jsx
    Footer.jsx
  assets/images/        <- apni images yahan rakhein
```

## Contact form

Abhi form sirf UI hai (submit par "Thanks" message dikhata hai). Real emails
bhejne ke liye `src/components/Contact.jsx` mein `handleSubmit` function mein
apna backend / EmailJS / Formspree integration add karna hoga.
