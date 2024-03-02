const router= require('express').Router();
const {Intro, About, Project, Contact, Experience, Left,Academic}= require('../models/portfolioModel');
const bcrypt = require('bcrypt');
const {User} = require('../models/userModel'); // Import your User model

// User registration route
router.post('/register', async (req, res) => {
    
      const { email,id, password } = req.body;
  
      // Check if the user already exists
      let existingUser = await User.findOne({ $or: [{email},{id}] });

      if (existingUser) {
        // User with the given email already exists
        return res.status(200).send({ success:false,message: "User already exists with this email or id" });
      }
      else {
      // Hash the password
      const hashedPassword =  bcrypt.hashSync(password, 10);
  
      // Create a new user
      let user
      try {
        const newUser =await new User({ email,id, password: hashedPassword });
        user=await newUser.save();
      }
      catch(err){
        return res.status(200).send({ success:false,error: "Can't Register" });
        console.log(err)
      }
      if (user){
        return res.status(200).send({success:true, message: "User registered successfully" });
      }

      // Enhance error handling - log the specific error message
     return res.status(200).send({ error: "Internal Server Error" });
    }
});


// User login route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(200).send({ message: 'User not found' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(200).send({ message: 'Invalid password' });
      }
  
      // If user and password are valid, consider implementing JWT for authentication
      // For simplicity, you can send a success message
      return res.status(200).send({ success:true,message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(200).send({ error: 'Internal Server Error' });
    }
  });
  
  // ... (existing code)
  

//get portfolio data
router.get('/get-portfolio-data', async(req,res)=>{

    try{
        const intros= await Intro.find();
        const abouts= await About.find();
        const projects= await Project.find();
        const contacts= await Contact.find();
        const experiences= await Experience.find();
        const sidebars=await Left.find();
        const academics=await Academic.find();
        res.status(200).send({
            intro:intros[0],
            about:abouts[0],
            projects:projects,
            contact:contacts[0],
            experiences: experiences,
            left:sidebars[0],
            academics:academics,
    })
    }
    catch(error){
        res.status(500).send(error);
    }
});

//update intro
router.post("/update-intro",async (req,res)=>{
    try {
        const intro = await Intro.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:intro,
        success: true,
        message : "Intro updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//update about
router.post("/update-about",async (req,res)=>{
    try {
        const about = await About.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:about,
        success: true,
        message : "About updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//update sidebar link
router.post("/update-left",async (req,res)=>{
    try {
        const left = await Left.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:left,
        success: true,
        message : "Sidebar links updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//update contacts
router.post("/update-contact",async (req,res)=>{
    try {
        const contact = await Contact.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:contact,
        success: true,
        message : "Sidebar links updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//add experience

router.post("/add-experience",async(req,res)=>{
    try{
        const experience= new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data:experience,
            success:true,
            message:"Experience added successfully",
        });
    }
    catch(error) {
        res.status(500).send(error);
    }
});

// update experience
router.post("/update-experience", async (req, res) => {
    try {
      const experience = await Experience.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).send({
        data: experience,
        success: true,
        message: "Experience updated successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });


//delete experience
router.post("/delete-experience",async(req,res)=>{
    try{
        const experience= await Experience.findOneAndDelete({_id:req.body._id});
        res.status(200).send({
            data:experience,
            success:true,
            message:"Experience deleted successfully",
        });
    } catch(error){
        res.status(500).send(error);
    }
});

//add project

router.post("/add-project",async(req,res)=>{
    try{
        const project= new Project(req.body);
        await project.save();
        res.status(200).send({
            data:project,
            success:true,
            message:"Project added successfully",
        });
    }
    catch(error) {
        res.status(500).send(error);
    }
});

// update project
router.post("/update-project", async (req, res) => {
    try {
      const project = await Project.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).send({
        data: project,
        success: true,
        message: "Project updated successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });


//delete project
router.post("/delete-project",async(req,res)=>{
    try{
        const project= await Project.findOneAndDelete({_id:req.body._id});
        res.status(200).send({
            data:project,
            success:true,
            message:"Project deleted successfully",
        });
    } catch(error){
        res.status(500).send(error);
    }
});

//add academics

router.post("/add-academic",async(req,res)=>{
    try{
        const academic= new Academic(req.body);
        await academic.save();
        res.status(200).send({
            data:academic,
            success:true,
            message:"Details added successfully",
        });
    }
    catch(error) {
        res.status(500).send(error);
    }
});

// update academics
router.post("/update-academic", async (req, res) => {
    try {
      const academic = await Academic.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).send({
        data: academic,
        success: true,
        message: "Details updated successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });


//delete academic
router.post("/delete-academic",async(req,res)=>{
    try{
        const academic= await Academic.findOneAndDelete({_id:req.body._id});
        res.status(200).send({
            data:academic,
            success:true,
            message:"Details deleted successfully",
        });
    } catch(error){
        res.status(500).send(error);
    }
});



module.exports=router;
