# Publish Vue application on GitHub Pages 
Simple Vue 3 application with Pinia for state, Primevue for UI components

## Run in StackBlitz
To open and run the application in StackBlitz - a development environment composed of VS Code, Node, npm and Vite.js completely running in your browser inside a WASM powered WebContainer:  
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/lucasjellema/code-cafe-vue3-people-application?file=src%2FApp.vue&terminal=dev)
Note: you can edit the application and any change is hot reloaded. 

## Run in Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/lucasjellema/code-cafe-vue3-people-application)

If you click on the button, you are prompted to launch a Gitpod workspace using a GitHub based authentication.

To run the People Application in development (hot module reload mode):

```
npm run dev
```

## To publish as GitHub Pages
(these instructions are inspired by: https://mkay11.medium.com/how-to-deploy-your-vite-vue-3-application-in-github-pages-2023-2b842f50576a). For more details about the npm package *gh-pages* check out [its homepage](https://github.com/tschaub/gh-pages).

Note: *you can only publish a GitHub Pages project in your own repository. So in order to be successful at these instructions, make sure that you have forked the GitHub repository and opened the Gitpod workspace for your fork.*

In the terminal run this command:
```
npm install gh-pages --save-dev
```

add in package.json:

```
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/NAME_OF_REPOSITORY/",
```


in my case: `"homepage": "https://lucasjellema.github.io/code-cafe-vue3-people-application/",`

Also add in the *scripts* entry in packgage.json:

```
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
```

![](images/package-json-for-ghpages.png)

In file *vite.config.ts* add property *base* in the configuration:
```
  base: "/NAME_OF_REPOSITORY/",

```
for example:
```
  base: "/code-cafe-vue3-people-application/", 
```

That is all it takes!

Then, to publish the application, execute:
```
npm run deploy
```

![](images/run-deploy-gh-pages.png)
This will build the application and subsequently start a GitHub Action in the repository that does the actual deployment. This can take a few minutes.  

Open the Vue application at homepage URL:

https://YOUR_GITHUB_USERNAME.github.io/NAME_OF_REPOSITORY/

or find link at GitHub Repo, Settings, Pages:

https://github.com/YOUR_GITHUB_USERNAME/NAME_OF_REPOSITORY/settings/pages

![](images/find-pages-link.png)

The application runs as it did before - at a publicly accessible URL:
![](images/vue-app-live-as-gh-pages.png)

To learn a little bit more about what happened when you performed deployment, you can checkout the GitHub repository. First of all, you will see that your repository now has one additional branch - called *gh-pages*. This branch contains a folder *assets*. This folder contains the product of the build actions performed by `npm run deploy`.  
![](images/github-repo-gh-pages.png) 

When you check under *Actions* you will find that a GitHub Actions workflow has been created and executed to turn the Vue sources into a GitHub Pages application.
![](images/github-actions-publish-ghpages.png)

You can drill down into each of the steps in the flow to learn more details. 
