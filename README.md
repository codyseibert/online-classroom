# Overview

The goal of this project is to create an online classroom that teachers and students can use. This includes a way for teachers to upload assignments, manage students grades, upload course material, set deadlines, etc. Students can search for classrooms and enroll before they start.

## How to contribute

If you want to contribute, fork this project and ask Cody (Web Dev Junkie) what you can work on. Please send a message on the online-chatroom channel found on this discord [https://discord.gg/MAvSGb3KyK](https://discord.gg/MAvSGb3KyK)

## Setup

1. `npm i`
2. `cp .env-sample .env`
3. `npx prisma migrate dev`
4. `npm run dev`
5. `open http://localhost:3000`

### Mock User

To test this project out locally with various user roles, set the following environment variable inside your .env file

- `NEXT_PUBLIC_MOCK_NEXT_AUTH=true`

this will put buttons in the footer you can use to switch users