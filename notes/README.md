# Writing a blog post

These are plain HTML files on free GitHub Pages. No build step or extra account.

## Publish a post

1. Open `notes/first-note.html` on GitHub and copy its contents.
2. Choose **Add file > Create new file**. Name it `notes/your-post-name.html` and paste the contents.
3. Edit only your content: the `<title>`, description, `<h1>`, date (both `datetime="YYYY-MM-DD"` and the visible date), and paragraphs inside `<article>`.
4. Remove both template notices, change `template / written note` to a topic label, and remove `SAMPLE`. Replace the sample text with your own writing.
5. Commit to `main`.
6. Open `notes/index.html`. Copy the `<article class="post">...</article>` block and put your new entry at the top. Update its date, title, blurb and `href="your-post-name.html"`. Remove the template badge from your real entry. Commit to `main`.
7. Wait for GitHub Pages to finish deploying, then check the link on your phone.

The home-page navigation already links to the notes index. Remove the sample's entry from the index and delete `first-note.html` when you no longer need it.

## The only markup you need

```html
<p>A paragraph of your own writing.</p>
<h2>A section heading</h2>
<p>Another paragraph, with <em>emphasis</em> or <strong>bold text</strong>.</p>
<p>A <a href="https://example.com">link</a>.</p>
```

Write `&amp;` for an ampersand and `&lt;` for a less-than sign in ordinary text. Use a blank line between blocks for readability.

Optional image: upload a photo to `notes/` and add this inside the article. Use the actual uploaded filename and meaningful alt text. Nothing private: this repository and site are public.

```html
<figure>
  <img src="your-photo.jpg" alt="Describe what is in the photo" style="width:100%;height:auto">
  <figcaption>A short caption.</figcaption>
</figure>
```

Each note includes its small stylesheet, navigation and progress bar, so copying one file is enough. Keep those parts and replace the article content. No video embeds, CMS, database or tracking is added.
