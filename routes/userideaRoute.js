const router = require('express').Router();
const { User,Idea } = require('../models/userModel'); // Import your User model

//get user ideas
router.get('/get-all-useridea', async (req, res) => {
  let ideas
  try {
     ideas = await Idea.find({});
     console.log(ideas)
  }
   catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  if(ideas)
  {
    
      return res.json(ideas)
  }
  else
  {
    
      return res.status(400).json({message:"Failed"})

  }
});

//add ideas

router.post("/add-idea/:id", async (req, res) => {
    const {id}=req.params
    const {idea} = req.body
    const date= new Date().toLocaleDateString()
    try {
        const userdata=await User.findOne({id:id});
        const {firstName,lastName} = userdata;
      const newidea = new Idea({ownerid:id,firstName,lastName,idea,date});
      await newidea.save();
      res.status(200).send({
        data: newidea,
        success: true,
        message: "Details added successfully",
      });
    }
    catch (error) {
      res.status(500).send(error);
    }
  });
  
  // update ideas
  router.post("/update-idea/:id", async (req, res) => {
    const {id}=req.params
    const {firstName,lastName,idea} = req.body
    try {
      const ideas = await Idea.findOneAndUpdate(
        { _id: req.body._id },{ownerid:id,firstName,lastName,idea},
        { new: true }
      );
      res.status(200).send({
        data: ideas,
        success: true,
        message: "Details updated successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
  //delete academic
  router.post("/delete-idea", async (req, res) => {
    try {
      const idea = await Idea.findOneAndDelete({ _id: req.body._id });
      res.status(200).send({
        data: idea,
        success: true,
        message: "Details deleted successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  



module.exports = router;
