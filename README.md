# gin-react-360-image
This project allows you effective and asynchronously frame-to-frame to display 360° your product galley from a database(gin/mgo) with different quality.

Your product galley will be more attractive/accurate/desired/glory for a buyer.

Allow you don't load not neccessary frames or views(only rotated/clicked images will load on client).

![gin+react 360-image](https://raw.githubusercontent.com/asm-jaime/gin-react-360-image/master/example.gif)

## Getting Started
First terminal (node/npm/yarn required):
~~~~
git clone https://github.com/asm-jaime/gin-react-360-image
cd gin-react-360-image
npm install
env $(cat .env.dev | xargs) yarn start
~~~~
Second terminal (mongodb and golang required):
~~~~
cd gin-react-360-image/gin-backend
go build && env $(cat .env.dev | xargs) ./gin-backend --start=init
env $(cat .env.dev | xargs) ./gin-backend --start=360
~~~~

## License
gin-react-360-image is open source software licensed as GNU General Public License v3.0.
