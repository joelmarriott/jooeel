let chat = document.getElementById('chat');
let inp_message = document.getElementById('inp_message');
let send = document.getElementById('send');
let username = document.getElementById('username');
let btn_connect = document.getElementById('connect');
let btn_disconnect = document.getElementById('disconnect');
var user = username.value;
let socket = io("http://92.232.75.235:5000", {autoConnect: false});
btn_connect.onclick = function(){
  if(username.value != ""){
    socket.connect();
  } else {
    alert("Please enter an username!");
    console.log("Please enter an username!");
  }
};
        
socket.on('connect', function(){
  inp_message.disabled = false;               
  send.disabled = false;                      
  username.disabled = true;                   
  btn_connect.disabled = true;                
  user = username.value;                      
  socket.emit('notify', user + " joined!");   
  btn_disconnect.disabled = false;ptag = document.createElement('p');
  ptag.innerHTML = "You joined!";
  chat.appendChild(ptag);console.log("Connected to server!");
});
socket.on('disconnect', function(){
  ptag = document.createElement('p');
  ptag.innerHTML = "You left!";
  chat.appendChild(ptag);console.log('Disconnected to server!')
  inp_message.disabled = true;               
  send.disabled = true;                      
  username.disabled = false;              
  btn_connect.disabled = false;           
  btn_disconnect.disabled = true          
  socket.close();
});
socket.on('notify', function(status){
  ptag = document.createElement('p');
  ptag.innerHTML = status;
  chat.appendChild(ptag);
});
btn_disconnect.onclick = function(){
  socket.emit('notify', user + " left!");   
  socket.close();
};
send.onclick = function(){
  socket.emit('data', "["+user+"]: " + inp_message.value);
  inp_message.value = "";
};
socket.on('returndata', function(data){
  ptag = document.createElement('p');
  ptag.innerHTML = data;
  chat.appendChild(ptag);
});