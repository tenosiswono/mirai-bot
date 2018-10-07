Mirai Kuriyama Telegram Bot
======
Telegram Bot for daily update to channel

How to run
-------
1. Make sure you have nodejs

2. Clone the repo:
```sh
git clone https://github.com/tenosiswono/mirai-bot.git
```
3. Install dependencies :
```sh
cd mirai-bot
npm install
```

4. copy env.sample vars (do changes if necessary) :
```sh
cp env.sample .env
```

6. Start the bot :
```sh
npm start
#or if you prefer pm2
pm2 start process.json
```
7. Done.
