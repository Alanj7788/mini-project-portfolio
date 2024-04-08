const router = require('express').Router();
const { User } = require('../models/userModel'); // Import your User model

//get user id
router.get('/get-all-userid', async (req, res) => {
  let users
  try {
     users = await User.find({});
     
  }
   catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  if(users)
  {
    
      return res.json(users)
  }
  else
  {
    
      return res.status(400).json({message:"Failed"})

  }
});
module.exports = router;
