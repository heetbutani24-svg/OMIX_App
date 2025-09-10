const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/generate', aiRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
