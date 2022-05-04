# <p align="center">[Social Flex](https://sf-for-others-77q457ss0-piotrko64.vercel.app)</p>

<p align="center"> <img src="https://user-images.githubusercontent.com/77500425/165108072-8531db71-9b50-4add-bf60-53023cd03cae.png" title="logoSF" alt="logo"/></p>

<p align="center">SocialFlex is NextJS app which connect simplified typical social website with blog. Website is using 'next-auth' to authorization users which can add  posts. In tab 'blog' you can see created posts by DatoCMS because I wanted see on connect headlessCMS with NextJS. You can look on this website but remember to don't writing sensitive or mannerless data  to forms </p>

<br />

<div align="center">

<img src="https://user-images.githubusercontent.com/77500425/161312230-36d37ac5-8801-4313-a68c-c5695c429b70.png" alt="javascript" height="50" align="center" title="JS"/>
<img src="https://user-images.githubusercontent.com/77500425/161312615-f3961568-28bb-48fa-9d95-93ecd61337b3.png" alt="react"  height="50" align="center"/>
<img src="https://user-images.githubusercontent.com/77500425/161314348-bd1a1db1-cf7d-4a7d-a870-25f357a2a03d.png" alt="Next.js" height="50"  align="center" title="NextJS"/>
<img src="https://user-images.githubusercontent.com/77500425/165108419-8a1d2ae8-06f6-4815-a232-ff403de5cf72.png" alt="NextAuth"  height="50" align="center" title="NextAuth"/>
<img src="https://user-images.githubusercontent.com/77500425/161313295-a11c936d-a0b3-4bb6-84c1-9ea3c459c3b8.png" alt="Mongo"  height="50" align="center"/>
<img src="https://user-images.githubusercontent.com/77500425/165483039-a65ef61f-a3ae-4524-bfa5-04788dd894ea.png" alt="Firebase"  height="50" align="center"/>

</div>

<br />

# Table of contents

-   [Instalation](#instalation)

-   [About project](#about)

-   [Inspiration](#inspiration)

-   [What have I learned from this project](#what-have-i-learned-from-this-project)

-   [Updating](#updating)

<br />

# Instalation

-   Download files by **git clone**
-   Use **npm i**
-   Use **npm start**

### You need to complete the **next.config.js** file with the following variables:

-   **mongodbConnect**: "yourConnectionString"
-   **clientId**: "clientId"
-   **clientSecret**: "clientSecretFromGithub"
-   **NEXT_DATOCMS_API_TOKEN**: "datoCMSToken"

clientId and clientSecret are to configure [github authorization](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)

If you have problems [click here](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)

**FIREBASE CONFIGURATION**

-   **apiKey**: "apiKEY",
-   **authDomain**: "authDomain",
-   **projectId**: "projectId",
-   **storageBucket**: "storageBucket",
-   **messagingSenderId**: "\*messagingSenderId",
-   **appId**: "appId",

<br />

# About

<p align="center"> <img src="https://user-images.githubusercontent.com/77500425/165478163-9055a564-88b4-482e-9f87-c10c0e2120e2.png"/><p>

<br />

SF using next-auth to helping with authorization users. If you want You can also login throught github

<p align="center"> <img src="https://user-images.githubusercontent.com/77500425/165482493-f354c8b6-ccef-4b62-b7b2-be94677357e8.png"/><p>

If the registration and login are successful, you can add/delete your posts or set your profile picture. If something go wrong you can see notification in bottom-right corner.

<p align="center"> <img src="https://user-images.githubusercontent.com/77500425/165482833-0f27a3d4-db2b-4d4b-ad78-cf443fc74f26.png"/><p>

If you are login you can visit Blog...Blog? But why blog in this kind app? Answer is simple! I just want using NextJs with DatoCMS (My favourite CMS) ;).

<br />

# Inspiration

-   I wanted check my knowledge from course [Maximilian Schwarzmüller](https://www.udemy.com/course/nextjs-react-the-complete-guide)
-   [Connect DatoCMS with NextJS](https://www.datocms.com/docs/next-js)

<br />

# What have I learned from this project

-   Create simple Nextjs project with authorizations
-   Use Firebase to storage images (I also learned how use Multer but using only Firebase will better and problemless)
-   Connect DatoCMS with NextJS

# Updating

## 04.05.2022
 - add emoji picker ( - next/dynamic will be helpful because emoji picker using document object) 
 - add message about state of upload image
