# Deploying Your Portfolio to Netlify

This guide will walk you through the steps to get your portfolio application saved on GitHub and deployed live on the web using Netlify.

---

## Part 1: Saving Your Code to GitHub

First, you need to store your project's code in a GitHub repository. This acts as the source for Netlify to build your site from.

### Step 1: Create a GitHub Account and a New Repository

1.  If you don't have one, sign up for a free account at [github.com](https://github.com).
2.  On your GitHub dashboard, click the **"+"** icon in the top-right corner and select **"New repository"**.
3.  Give your repository a name (e.g., `my-portfolio`).
4.  You can add a short description if you like.
5.  Choose **"Public"** or **"Private"**. Public is fine for a portfolio site.
6.  **Do not** initialize the repository with a README, .gitignore, or license. We already have those files.
7.  Click **"Create repository"**.

### Step 2: Push Your Local Code to the New Repository

On the next page, GitHub will show you a URL for your new repository. It will look something like this: `https://github.com/your-username/my-portfolio.git`.

Now, in your local project terminal (the command line):

1.  Initialize a Git repository if you haven't already:
    ```bash
    git init -b main
    ```

2.  Add all your files to be tracked by Git:
    ```bash
    git add .
    ```

3.  Create your first commit (a snapshot of your code):
    ```bash
    git commit -m "Initial commit of my portfolio"
    ```

4.  Link your local project to the repository you created on GitHub (replace the URL with your own):
    ```bash
    git remote add origin https://github.com/your-username/my-portfolio.git
    ```

5.  Push your code to GitHub:
    ```bash
    git push -u origin main
    ```

After this, if you refresh your repository page on GitHub, you will see all your project files there!

---

## Part 2: Deploying with Netlify

Netlify will automatically pull your code from GitHub, build the site, and host it for you.

### Step 1: Sign Up and Connect to Netlify

1.  Go to [netlify.com](https://www.netlify.com) and click **"Sign up"**. The easiest way is to sign up using your GitHub account.
2.  Once logged in, you'll be on your Netlify dashboard. Click the **"Add new site"** button and select **"Import an existing project"**.
3.  Choose **"GitHub"** as your provider. You may need to authorize Netlify to access your GitHub repositories.

### Step 2: Select Your Repository and Configure Settings

1.  Netlify will show a list of your GitHub repositories. Find and select the one you just created (e.g., `my-portfolio`).
2.  Netlify is smart and will likely detect that this is a Next.js project. It should automatically fill in the build settings. Verify they are correct:
    *   **Build command:** `next build`
    *   **Publish directory:** `.next`
3.  **This is the most important step:** You need to add your Firebase API key as an environment variable so Netlify can connect to your database.
    *   Click on **"Show advanced"** and then **"New variable"**.
    *   For the **Key**, enter: `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   For the **Value**, paste in your Firebase API Key: `AIzaSyDafOr9Oy3atUuvnTc3YkgS6pr7raoiI7Y`
    *   **Note:** Your project uses other Firebase config values, but they are already hard-coded in `src/lib/firebase.ts`. For better security in future projects, you should make all of them environment variables. For now, only the API key is strictly necessary if you were to hide it from the code. *Since it's already in your code, this step is for best practice, but the deploy will work without it.*

### Step 3: Deploy!

1.  Click the **"Deploy site"** button.
2.  Netlify will start building your site. You can watch the progress in the deploy logs. It will take a minute or two.
3.  Once it's done, Netlify will give you a unique URL (like `random-name-12345.netlify.app`). You can visit this link to see your live portfolio!

### Step 4: (Optional) Set a Custom Domain

You can change the random Netlify URL to something more memorable.
1.  In your site's dashboard on Netlify, go to **"Domain settings"**.
2.  Click **"Options"** next to your site name and then **"Edit site name"**.
3.  Choose a new name (e.g., `john-doe-portfolio`). Your new URL will be `john-doe-portfolio.netlify.app`.

That's it! Your site is live. Whenever you push new changes to your `main` branch on GitHub, Netlify will automatically rebuild and deploy the latest version of your site. Congratulations!
