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
  


// Save or remove like for an idea
router.post("/save-like/:id", async (req, res) => {
  const { id } = req.params; // Idea ID
  const { ownerid } = req.body; // Owner ID

  try {
      // Find the idea by ID
      const idea = await Idea.findByIdAndUpdate(id);
      if (!idea) {
          return res.status(404).json({ message: "Idea not found" });
      }
      
      // Check if the user has already liked the idea
      const index = idea.likes.indexOf(ownerid);
      if (index !== -1) {
          // User has already liked the idea, remove the like
          idea.likes.splice(index, 1);
      } else {
          // User has not liked the idea, add the like
          idea.likes.push(ownerid);
      }
      
      // Save the updated idea
      await idea.save();
      
      res.status(200).json({ message: "Like updated successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
