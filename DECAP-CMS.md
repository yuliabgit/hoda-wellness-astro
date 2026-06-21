# Decap CMS — Content Manager Setup

HODA Wellness Group uses [Decap CMS](https://decapcms.org/) so non-technical editors can manage blog posts, team members, programs, and the site announcement banner without touching code.

## Admin URL

Once deployed to Netlify, open:

**https://musical-brioche-e3c8a5.netlify.app/admin**

Locally (with `npm run dev` running):

**http://localhost:4321/admin**

The admin UI loads from `public/admin/index.html` and reads its configuration from `public/admin/config.yml`.

---

## Enable Netlify Identity + Git Gateway

Decap CMS saves changes by committing to your Git repository. On Netlify, that requires **Netlify Identity** (who can log in) and **Git Gateway** (permission to commit via the CMS).

### Step 1 — Deploy the site to Netlify

1. Push the `hoda-astro` project to a GitHub (or GitLab/Bitbucket) repository.
2. In the [Netlify dashboard](https://app.netlify.com/), click **Add new site → Import an existing project**.
3. Connect the repo. Netlify reads build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy the site and confirm it loads at your Netlify URL.

### Step 2 — Enable Netlify Identity

1. In Netlify, open your site → **Site configuration** → **Identity**.
2. Click **Enable Identity**.
3. Under **Registration preferences**, choose **Invite only** (recommended). This prevents public sign-ups; only people you invite can access the CMS.
4. Optional: under **Emails → Invitation template**, customize the invite email text.

### Step 3 — Enable Git Gateway

1. Still under **Identity**, scroll to **Services** → **Git Gateway**.
2. Click **Enable Git Gateway**.
3. Netlify will connect to your repo and allow authenticated Identity users to commit through the CMS.

### Step 4 — Confirm the backend branch

In `public/admin/config.yml`, the backend is set to:

```yaml
backend:
  name: git-gateway
  branch: main
```

If your default branch is `master` or something else, update `branch` to match before inviting editors.

---

## First-time invite flow

### For the site owner (you)

1. Deploy the site with Identity and Git Gateway enabled (steps above).
2. Go to **Site configuration → Identity → Invite users**.
3. Enter the editor’s email address and send the invite.
4. Tell them to open **https://musical-brioche-e3c8a5.netlify.app/admin** after accepting the invite.

### For the invited editor

1. Check email for **“You've been invited to join …”** from Netlify.
2. Click the link, set a password, and confirm the account.
3. Visit **/admin** on the live site.
4. Click **Login with Netlify Identity** and sign in with the email and password just created.
5. Use the left sidebar to edit:
   - **Blog Posts** — create/edit MDX articles in `src/content/blog/`
   - **Team → Team Members** — edit `src/data/team.json`
   - **Programs → Programs** — edit `src/data/programs.json`
   - **Announcements → Site Announcement Banner** — edit `src/data/announcements.json`
6. Click **Publish** (or **Save**) on each entry. Decap commits the change to Git; Netlify rebuilds the site automatically.

> **Note:** Changes appear on the live site after Netlify finishes the deploy triggered by the Git commit (usually 1–3 minutes).

---

## What editors can manage

| Collection | File(s) | Notes |
|------------|---------|-------|
| Blog Posts | `src/content/blog/*.mdx` | Set **Draft** to hide a post. Description max 160 chars. |
| Team Members | `src/data/team.json` | Keep **ID** lowercase with hyphens (used in URLs). |
| Programs | `src/data/programs.json` | **ID** becomes the URL slug (`/programs/[id]`). |
| Announcements | `src/data/announcements.json` | Only one item should have **Active** checked. |

Uploaded images are saved to `public/images/uploads/` and served at `/images/uploads/…`.

---

## Local development (optional)

To test the CMS locally without Netlify:

1. Uncomment `local_backend: true` in `public/admin/config.yml`.
2. In a separate terminal, run: `npx decap-server`
3. Run `npm run dev` and open http://localhost:4321/admin

Local edits write directly to your filesystem (no Git commits). Re-comment `local_backend` before deploying.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| “Failed to load entries” | Confirm Git Gateway is enabled and the `branch` in `config.yml` matches your repo. |
| Login button missing | Ensure Netlify Identity is enabled on the deployed site (not just locally). |
| Changes not on live site | Wait for the Netlify deploy after publishing; check **Deploys** in the Netlify dashboard. |
| Image upload fails | Verify `public/images/uploads/` exists in the repo. |

For more detail, see the [Decap CMS docs](https://decapcms.org/docs/) and [Netlify Identity docs](https://docs.netlify.com/security/secure-access-to-sites/identity/).
