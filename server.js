const LogMode = {
  Full: 2,
  Minimal: 1,
  No: 0
  };
  
  const net = require("net");
  
  const host = "127.0.0.1";
  const port = 3000;
  
  var _logMode = LogMode.Full;
  
  var clients = [];
  
  const server = net.createServer((socket) => {
  
  if (_logMode > 0) console.log("Client connected");
  
  clients.push(socket);
  socket.on("data", (data) => {
  if (_logMode >= 2) console.log(data.toString());
  if (clients.length > 0) {
  for (let index = 0; index < clients.length; index++) {
  const element = clients[index];
  if (socket != element) {
  element.write(data.toString());
  }}}});
  
  socket.on("end", () => {
  console.log("Client disconnected");
  });
  });
  
  server.listen(port, host, () => {
  console.log("Server is listening on " + host + ":" + port);
  });