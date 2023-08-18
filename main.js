const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 3002;
app.use(cors());
app.options('*', cors()); // Handle preflight requests

app.use(express.json());

app.post('/run_command', (req, res) => {
	const command = 'ipconfig /all';
	exec(command, (error, stdout, stderr) => {
		if (error) {
			res.json({ error: error.message });
			return;
		}
		if (stderr) {
			res.json({ error: stderr });
			return;
		}
		res.json({ result: stdout });
	});
});

app.listen(PORT, () => {
	console.log(`Node.js server is running on port ${PORT}`);
});
