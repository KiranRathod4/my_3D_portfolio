

## Getting Started


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



# Guide: Building a Modern Personal Portfolio Website in 10 Minutes

A complete step-by-step guide to creating a premium personal website with animated visuals using AI-powered tools.

---

## Phase 1: Generating Visual Assets

### Step 1: Generate Static Frames

1. Navigate to [**Google Whisk](https://labs.google/fx/tools/whisk)** on your browser
2. Upload a photo of yourself or your product as the subject
3. Use the frames prompt : 

```
Cinematic portrait with high-contrast dual-tone lighting, combining deep blues and fiery oranges. The mood feels dramatic, premium, and modern — like a movie poster or high-end branding website hero section.

Lighting & Color:

Key lighting: Strong overhead/front key light in warm orange/red tones.

Fill lighting: Cool blue gradient shadows on the opposite side of the face.

Color palette: Deep navy blue background fading into warm orange near the subject.

Contrast: Very high contrast, with sharp separation between warm + cool tones.

Subject Look:

Close-up portrait facing upward, looking upward, giving an inspiring, heroic vibe.

Low-angle camera perspective for a powerful, aspirational feeling.

Soft, subtle rim light around the edges to separate the subject from the background.

Composition:

Subject centered, but text area is intentionally left/right clear.

Smooth vignette effect around edges to focus attention on the face.

Clean fade between colors (no harsh transitions).

Texture & Finish:

Smooth, professional, glossy finish — similar to premium ad photography.

Subtle film-like grain for realism (optional).

Skin smoothness maintained but not overly retouched.

Background:

Gradient blend from dark blue at the top to warm orange/red at the bottom.

No distractions; fully blurred or minimal texture.

Mood / Branding Feel:

Bold, confident, modern.

Feels like a brand designer or creative professional’s hero banner.

Strong cinematic atmosphere with directional lighting.
```

### Step 2: Animate the Images

1. Select a frame you like from the generated options
2. Click the **animate button**
3. Type this prompt in the field and click create 

```
A smooth cinematic 3D transition
```

1. Create a clean, fluid animation that gives the site a premium look

---

## Phase 2: Converting Animation for Web Use

### Step 3: Convert to WebP Format

1. Search for "video to webp" and open [ezgif](https://ezgif.com/video-to-webp)
2. Upload your animation
3. Apply the following settings:
    - **Resolution:** Original
    - **FPS:** 15 (or the closest native FPS)
    - **Quality:** 85

### Step 4: Extract Frames

1. Click the **split button** to break the webp video into individual image frames
2. Download the generated **zip file**
3. **Unzip** the file on your computer

---

## Phase 3: Engineering with Google Antigravity

### Step 5: Setup the Project

1. Open [**Google Antigravity**](https://antigravity.google/) (available as a free download)
2. **Drag and drop** the unzipped folder of images directly into the tool
3. **Rename the folder to "sequence"** so the code can correctly locate the animation frames

### Step 6: Generate Code via AI

1. Open the **Agent Chat** on the right side
2. Select the **Gemini 3 Pro high model**
3. Paste the **system prompt** :

```
- *ACT AS:**
A Senior Creative Developer (Awwwards-level) specializing in Next.js, Framer Motion, and high-performance scroll interactions.
**THE TASK:**
Build a high-end "Scrollytelling" Personal Portfolio Website.
The core mechanic is a scroll-linked animation that scrubs through an image sequence as the user scrolls down the page.
**TECH STACK:**
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Rendering Strategy: HTML5 Canvas (for performance)
**ASSETS LOCATION:**
- I have placed a sequence of WebP images in the folder: `/sequence/`
- The files are named sequentially (e.g., `frame_00_delay-0.067s.webp`, `frame_01_delay-0.067s.webp`... up to roughly 89 frames).
**IMPLEMENTATION BLUEPRINT:**
1. **Global Styles & Reset:** - Set the global background color to a specific hex code (e.g., #121212) to match the background of the video frames. This is CRITICAL for seamless blending. - Use a clean sans-serif font (Inter or San Francisco).
2. **Component 1: The Sticky Scroller (`ScrollyCanvas.tsx`):** - Create a parent container with a height of `500vh` (to allow for a long, cinematic scroll). - Inside, create a `sticky` container (`top-0 h-screen w-full`). - Use an HTML5 `<canvas>` element to render the images. - Logic: Use Framer Motion's `useScroll` to map the scroll progress (0 to 1) to the image frame index. - **Optimization:** You MUST preload the images in a `useEffect` hook to prevent flickering/white flashes during scroll.
3. **Component 2: The Parallax Overlay (`Overlay.tsx`):** - Create text sections that sit *on top* of the canvas (z-index 10). - As the user scrolls, these text elements should fade in/out using `motion.div` with parallax speed (move slightly faster or slower than scroll). - **Section 1 (0% scroll):** "My Name. Creative Developer." (Center) - **Section 2 (30% scroll):** "I build digital experiences." (Left aligned) - **Section 3 (60% scroll):** "Bridging design and engineering." (Right aligned)
4. **Component 3: The Work Grid (`Projects.tsx`):** - Placed *after* the scroll animation finishes (below the 500vh container). - A modern grid layout showcasing 3-4 project case studies. - Style: Glass-morphism cards (backdrop-blur, thin borders, subtle hover glow).
**EXECUTION RULES:**
- Do not use a `<video>` tag; use Canvas.
- Ensure the canvas uses `object-fit: cover` logic so it looks good on Mobile and Desktop.
- Write clean, modular code.
**START:**
Begin by scaffolding the directory structure and writing the `ScrollyCanvas` component.

Need modern looking, darkish, website. use nano banana if need more UI components or buttons or anything
```

1. Hit **run** to scaffold the entire application automatically

### Step 7: Preview and Personalize

1. Run the command **`npm run dev`** to preview the site
2. Check if the scroll interactions are smooth
3. Provide the AI with your personal information:
    - Portfolio details
    - Work experience
    - Skills and achievements
4. Let the AI populate the content of your website.


---

<div align="center">

### 💬 Let's Connect

Building at the intersection of **AI & Engineering** — always open to collaborating,  
learning, and connecting with like-minded people.

If you found any of my projects helpful or interesting, I'd love to hear from you!

<br/>

**Follow along for AI/ML content, dev workflows, and behind-the-scenes builds 👇**

[![Instagram](https://img.shields.io/badge/Follow_on_Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/)
[![LinkedIn](https://img.shields.io/badge/Connect_on_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kiranrathod05/)

<br/>

*"The best way to learn is to build, share, and connect."*

<br/>

---

⭐ **If you liked my work, consider starring the repo — it means a lot!**

© 2026 Kiran Rathod · Made with ☕ and a lot of AI conversations

</div>
