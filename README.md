## Project Title

WDJ Online Campus ![WDJ Icon](https://github.com/tnfdesigns/online-classroom/blob/main/src/assets/wdj-icon.png)

### Overview

The goal of this project is to create an online teaching platform. Where teachers and students can work together from almost any location online.

- You will learn real world programming skills which are immediately applicable in today's competitive tech industry.
- Our campus provides students with flexibile, focused and personalized courses for each student.

It's true, I love teaching! So let's hang out with on [https://www.youtube.com/c/WebDevJunkie](https://www.youtube.com/c/WebDevJunkie). I stream daily videos teaching you the skills that will help you be succesful. Glad to see you here!</br>

Check out our Initial project goals below, expand for details!

<blockquote>
<details>
<summary>Teachers will be able to create/manage:</summary>
         - classes</br>
         - course materials</br>
         - announcements</br>
         - calendar events</br>
         - student communications</br>
</details>
</blockquote>
<blockquote>
<details>
<summary>Students will be able to:</summary>
         - view and enroll in classes.</br>
         - view, upload or download assignments and course materials.</br>
         - view grades, announcements and calendar events.</br>
         - communicate with teachers.</br>
</blockquote>
</details>

### How to contribute

If you would like to contribute: fork this project and clone it to your local machine.

1. [https://github.com/codyseibert/online-classroom](https://github.com/codyseibert/online-classroom)</br>   - [https://docs.github.com/en/get-started/quickstart/fork-a-repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
1. Ask Cody (Web Dev Junkie) what you can work on in our discord found here: [https://discord.gg/MAvSGb3KyK](https://discord.gg/MAvSGb3KyK)
1. **Please** be sure to **1st** send a message in the online-classroom channel found on our discord!

[Contribution guidelines are located here](./CONTRIBUTING.md)

### Setup

In your terminal

    - npm i                         (install project dependencies locally.)
    - cp .env-sample .env           (copies .env-sample file to a new local .env file.)
    - npx prisma migrate dev        (updates prisma db and syncs data.)
    - npm run dev                   (starts the project development server.)
    - open http://localhost:3000    (cmd/ctrl + click the link in terminal output to open browser.)

    Note: If app is not showing on port http://localhost:3000 Check terminal output
    & verify port number. If port is already in use check http://localhost:3001 or 3002, etc...

<blockquote>
In an additional terminal tab run Docker:

- `$ docker compose up`

  [https://docs.docker.com/engine/reference/commandline/compose_up/](https://docs.docker.com/engine/reference/commandline/compose_up/)
  </blockquote>

<blockquote>
In an additional terminal tab run Prisma Studio:

- `$ npx prisma studio`

  [https://www.prisma.io/studio](https://www.prisma.io/studio)
  </blockquote>

#### Mock User Setup

To test or development this project locally, various user roles are available. Set the following
environment variable inside your **.env file**:

- `NEXT_PUBLIC_MOCK_NEXT_AUTH=true`

Setting this env var will add buttons to the footer, allowing you use and s to switch users easily!
Watch here to see implementation:

If you have questions or are unfamiliar with NEXTJS auth, please see the NEXT AUTH docs: [https://next-auth.js.org/](https://next-auth.js.org/)

## Prisma

This project uses Prisma for database management.

[https://www.prisma.io/docs/](https://www.prisma.io/docs/)

To generate a new migration, run

`$ npx prisma migrate dev --name <migration-name>`

## TRPC

This project uses TRPC for End-to-end typesafe APIs made easy.

- To see how TRPC is used in this project follow this link: [/src/server/router/index.ts](/src/server/router/index.ts)
- Individual routers can then be found in the same directory, eg:
  [/src/server/router/assignmenRouter.tsx](/src/server/router/assignmenRouter.tsx)

**NOTE:** This project uses TRPC (version 9.26.2). Please make sure you
referencing the correct docs version!

- [https://trpc.io/docs/v9/](https://trpc.io/docs/v9/)

Here are the docs for reference if you would like to contribute by migrating from
v9 to v10, **_after v10 is officially released_**.

- [https://trpc.io/docs/v10/migrate-from-v9-to-v10](https://trpc.io/docs/v10/migrate-from-v9-to-v10)

Version 10 docs in preparation of future migragration from v9 to v10.

- [https://trpc.io/docs/v10/](https://trpc.io/docs/v10/)

## CSS Styling

This project uses Tailwind CSS & Headless UI for styles.

##### TailwindCSS:

TailwindCSS is a utility-first CSS framework, allowing you to apply styles quickly
right in component tags.

The docs are great, simply search for the css style you are trying to apply.

> Tip: Search using (cmd/ctrl + k) from anywhere in the docs.

[https://tailwindcss.com/docs/](https://tailwindcss.com/docs/installation)

##### Headless UI:

Headless UI is a component library and was built to intergrate seemlessly
with Tailwind CSS. It includes unstyled, fully accessible UI components,
designed to integrate beautifully with Tailwind CSS.These components are
useful when you need a more complex accessible component but don't want to
build it from scratch. Thank you in advance for helping us to keep
accessibility a top priority!

Here is the reference for HeadlessUI: [https://headlessui.com/](https://headlessui.com/)

**NOTE**: Be sure to select the **_React_** tab when reviewing/using components.

![Screenshot showing react selection tab at headlessui.com](https://github.com/tnfdesigns/online-classroom/blob/main/src/assets/headlessui-react-select.png 'Select React')

#### Deploying project to Railway:

Recently I walked through deploying this project to Railway.app. Check out the video below.

- [YouTube Video walkthrough with Web Dev Junkie click here!](https://www.youtube.com/watch?v=fOhw2Yt7yk4&t=199s)

#### Changelog:

- [View the Changelog here](https://github.com/codyseibert/online-classroom/blob/main/CHANGELOG.md)

#### FAQs:

- [View the FAQs here](https://github.com/codyseibert/online-classroom/blob/main/FAQ.md)
