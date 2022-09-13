const express = require('express');
const port = 5050;
const cors = require('cors');
const app = express();

let corsOptions = {
	origin: "*",
	credential: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`server is running. http://localhost:${port}`);
});
