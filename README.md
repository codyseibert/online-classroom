# Overview

The goal of this project is to build an online classroom for teachers to upload assignments with deadlines that students can read and upload homework entries.  We plan to support a chat feature, maybe a discussion board on assignments or in the classroom, ability for a teacher to upload class material, etc.


# How to Contribute

The main source of communication should be the discord channnel. Join the web dev junkie discord and go to the online-classroom channel to ask to be added as a collab.  You're welcome to also fork and submit pull requests if that's easier for you.

The idea currently is to work off of `main`.  As you add small changes or features commit those to main.  You should be committing changes every hour or less if you're doing this correctly with small commits.  

# How to Run

1. `git clone https://github.com/codyseibert/wdj-online-classroom.git`
2. `cd wdj-online-classroom`
3. `npm i`
4. `npx prisma migrate dev`
5. create .env file - ask web-dev-junkie for .env file if you don't know how to setup a google cloud api
6. `npm run dev`
7. `open http://localhost:3000`
