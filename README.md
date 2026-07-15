# Love Story

A private static romantic story web app built with plain HTML, CSS, and vanilla JavaScript.

The story advances one scene at a time. The opening button starts the experience, and each scene has its own button to continue.

## Run Locally

Open the folder from a static web server:

```bash
cd love-story
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

You can also open `index.html` directly, but a static server is closer to how GitHub Pages and Netlify behave.

## Replace Photos

Add your own WebP images at these paths:

- `assets/photos/opening.webp`
- `assets/photos/together.webp`
- `assets/photos/wedding.webp`
- `assets/photos/future.webp`

The layout still works if these files are missing. Replace the wedding photo first:

```text
assets/photos/wedding.webp
```

The small-moments section also uses these extra memory photos:

- `assets/photos/20260304_195712.webp`
- `assets/photos/20260513_160446.webp`
- `assets/photos/20260527_161645.webp`
- `assets/photos/IMG-20260527-WA0030.webp`

The two-worlds section uses:

- `assets/photos/finland.webp`
- `assets/photos/vietnam.webp`

There is also an HTML comment above the wedding image in `index.html`.

## Edit Text

Most visible story text is in `index.html`.

Small editable configuration values are collected near the top of `app.js` in:

```js
const storyContent = {
  opening: {},
  wedding: {},
  ending: {}
};
```

Edit `[WEDDING DATE]` in `index.html` when you are ready.

## File Structure

```text
love-story/
  index.html
  styles.css
  app.js
  README.md
  assets/
    photos/
    illustrations/
    audio/
    icons/
```

## Deploy To GitHub Pages

1. Commit the `love-story` folder to a GitHub repository.
2. In GitHub, open Settings.
3. Open Pages.
4. Choose the branch and folder that contains `love-story`.
5. Save and wait for the Pages URL.

If the repository root is used for Pages, move the contents of `love-story` to the root or configure Pages to publish from the correct folder.

## Deploy To Netlify

1. Log in to Netlify.
2. Choose Add new site.
3. Drag the `love-story` folder into the manual deploy area, or connect the GitHub repository.
4. Leave build command empty.
5. Set publish directory to `love-story` if the repository has other files.

## Browser Support

The app uses standard HTML, CSS, and JavaScript:

- modern mobile Safari
- modern Chrome
- modern Edge
- modern Firefox

Intersection Observer is used for scroll reveals. If unavailable, all sections are shown normally.

## Privacy Note

This is a static site. It has no backend, no database, and no tracking code.

If you deploy to a public static host, anyone with the URL may be able to view it. Use private hosting, an unlisted URL, or access controls if the photos or message should remain private.
