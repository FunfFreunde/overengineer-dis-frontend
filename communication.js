function doConnect(useSSL, server, port) {
    let url;

    if (useSSL === true) {
        url = 'wss://' + server + ':' + port;
    }
    else
    {
        url = 'ws://' + server + ':' + port;
    }

    websocket = new WebSocket(url);

    websocket.onopen = (event) => {
        console.log('Opened WebSocket connection with ' + url);

    };

    websocket.onclose = (event) => {
        console.log('Closed WebSocket connection!');

    }; 

    websocket.onmessage = onMessageReceived;

    websocket.onerror = (event) => {
        console.error('There was an ERROR!');
        console.error(event);
    };
}

function onMessageReceived(event) {
    console.log('received a message!');
    console.log(event);
}

function sendMessage(message) {
    console.log('sending message to the server...');
    websocket.send(message);
}

export { sendMessage, doConnect, onMessageReceived };