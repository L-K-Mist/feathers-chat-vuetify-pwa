// Include and set up feathers client
import Feathers from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030/', { // If and when you do create an online, production version this must change to the server you're pointing to.  If you're using VS Code, then docker for VS code is great for putting your copy of the feathers Chat Server online. As per https://code.visualstudio.com/tutorials/docker-extension/containerize-app The `docker: add docker files` command will help you generate the necessary docker files to take your feathers-chat-server online with the likes of zeit.co. 
  transports: ['websocket'],
  forceNew: true
})


const feathers = Feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage
  }))


export default feathers