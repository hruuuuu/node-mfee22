const express = require('express');
require('dotenv').config();
let app = express();
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
