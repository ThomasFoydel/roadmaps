If you're reading this:

1. Please hire me lol
2. You can find a live version of this app at http://foydelroadmaps.herokuapp.com
3. Below you will find the instructions for running this app locally.

# ROADMAPS

## For the kind folks at RepairShare

1. Download and unzip or clone this repository
2. Add a .env file in the root of the project
3. Add a `MONGO_URI` variable to that .env file (probably use the one I sent when I emailed you the link to this repo, or you can use your own mongoDB atlast uri if you have one)
4. From the root of the project, run the command `npm run install-all`
5. Once installation is complete, run the command `npm run dev`
6. The last command should open the front end in your default browser, you can now explore it.
7. The + buttons can be used to add roadmaps, sagas, and tasks
8. The - buttons can be used to delete roadmaps, sagas, and tasks
9. The pencil buttons can be used to edit roadmaps, sagas, and tasks
10. Tasks have checkboxes which can be toggled

Details if you feel like reading them:

I used react for the frontend, node/express/@apollo-server for the backend, and mongoDB for the database. I know the instructions said I could just store the data in memory, but I like using nodemon in development, so every time I saved the data was wiped clean. I started using a JSON file to store the data so it would persist between saves/restarts.

I wanted to store it similar to the way it would be stored in an actual database, with roadmaps, sagas, and tasks living in separate "tables", connected by foreign keys. When I started working on some database service functions for the resolvers to use, I realized I was basically building out a whole ORM for a JSON "database" and since I've never designed a real database before it was not going to be very optimized. I figued it would just be faster to use a real database.

I would've liked to use postgres, but I went with mongoDB since it has a free-tier cloud option. I changed my approach from chlid table rows having foreign keys to parent documents having arrays of reference ids representing child documents because my original sql-ish approach would've led to some kinda hairy nested $lookup aggregations.

By reversing the id references, I was able to just use some simple .populate calls. This does mean that there would be some upper limit on the number of tasks a saga can have, and how many sagas a roadmap can have, since parent documents are storing arrays of objectIds, but each objectId is 12 bytes and the document size limit is 16 megabytes so if someone hit that limit (around 1,333,333, minus a few for the rest of the document), I think they have bigger problems to deal with.

Once I had the database and server architecture finished I was off to the races. I built the react app pretty quickly so I decided to add some animations. I chose react-spring because it is performant and declarative. I also added tooltips for clarity on what the buttons do and toasts to display error/success messages.

## Where I would go from here

1. Add Tests
2. Add TypeScript
3. Wrap the functions inside react components in useCallback
4. Wrap computed values inside react components in useMemo
5. Work on the design, especially for mobile, I don't like how close those buttons are
6. Build up a folder of reusable ui components
7. Add JSdocs to most of the functions
8. Add authentication and let users manage their own personal list of roadmaps
9. Rewrite it in Rust (just kidding, kind of)
