
![inferno](http://miitch.io/assets/img/inferno_banner.png)

Inferno is a multi-purpose Discord bot with a wide range of extensive features.

## Features
Inferno boasts an extensive range of features for all purposes.

* **99.9% Uptime** - With exceptions to maintenance and updates, you can trust that this bot is online all the time
* **Moderation Cases** - Manage all punishments with individual user-assigned cases. Everything is logged and can be viewed by moderators.
* **Punishments** - The basic punishment system: warning, bans, kicks, etc.
Moderator/Admin Permissions - Set permission levels for the moderator and admin roles. In the future, all commands will be assignable to different roles.
* **Reminders** - Set timed reminders so you never forget what you're doing.
* **Per-Guild Configs** - Each server has their own configuration, where you can change the prefix, set permissions, etc.
* **Custom Commands** - Tired of having to type everything? Consolidate it into a simple custom command!

... and much much more (seriously, just type `;help` for a list).

## Installation
Clone this repository and run:

### Client
```
mv .env.example .env
npm install
```
Edit the `.env` environment as you wish. Most values should remain default except the bot authentication token.

### API
```
cd ./api
mv .env.example .env
npm install
```
You **need** to edit the `.env` file to set your database credentials. Once the database is set up, migrate the schemas:

```
npm run db:build
```
If successful, the bot is now ready to use.

## Starting (Development)

### Client
```
npm run start:watch
```
This will build the `tsconfig-paths` automatically and you will be able to edit with hot reload enabled.

### API
```
npm run start:watch
```
Same as above, everything is magic.

## Building
There's a very simple build script located in the root directory. Building is therefore very easy and can be done with a single, simple command:
```
chmod +x ./build.sh
./build.sh
```
This will separate all files (client &amp; API) into their own respective `/build` directories. This is where all the compiled code will go.
  
### Starting in Production
You must run this in the root (client) directory &amp; the `api/` directory to start both clients:
```
npm start
```
Alternatively, when the bot is live it's best to use a process manager such as **pm2**.
