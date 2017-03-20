
/// @addtogroup watchstock-server
/// @{
/// @file index.js
/// @brief:  Main app. entry point
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0


const app = require('./app');


// Server Setup
//const port = process.env.PORT || 3090;
app.listen(8081, () => {
  console.log('Running on port 8081');
});


/// @}