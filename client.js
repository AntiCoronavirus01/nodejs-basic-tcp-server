const net = require("net");
const readline = require("readline");

const host = "127.0.0.1";
const port = 3000;

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function handleConsoleClose() {
  // Code to be executed when the console is closed
  console.log("\n Console closed. Performing special operations...");
  // Perform desired operations here
  client.destroy();
  // Once the console is closed, the program can be terminated by calling process.exit()
  process.exit();
}

var id;

rl.question("Enter your name: ", (name) => {
  id = name;
  
  client.connect(port, host, () => {
    console.log("Connected to the server");

    process.on('SIGINT', handleConsoleClose);
    client.write(`ID: ${id}`);
    GetInput();
  });
});

client.on("data", (data) => {
  console.log(data.toString());
});

client.on("close", () => {
  console.log("Connection closed");
});

function GetInput() {
  rl.question(">", (input) => {
    client.write(`${id} : ${input}`);
    GetInput();
  });
}
