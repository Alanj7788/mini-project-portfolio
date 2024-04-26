const router = require('express').Router();
const { Intro, About, Project, Contact, Experience, Left, Academic } = require('../models/portfolioModel');
const bcrypt = require('bcrypt');
const { User,Idea } = require('../models/userModel'); // Import your User model
const multer= require('multer')
const path = require('path')


// User registration route
router.post('/register', async (req, res) => {

  const { email, id, password,firstName,lastName,sem,skills,image } = req.body;

  // Check if the user already exists
  let existingUser = await User.findOne({ $or: [{ email }, { id }] });
  
  if (existingUser) {
    // User with the given email already exists
    return res.status(200).send({ success: false, message: "User already exists with this email or id" });
  }
  else {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    let user
    try {
      const newUser = await new User({ email, id, password: hashedPassword, firstName,lastName,sem,skills,image});
      user = await newUser.save();

      
    }
    catch (err) {
      return res.status(200).send({ success: false, error: "Can't Register" });
      console.log(err)
    }
    if (user) {
      return res.status(200).send({ success: true, message: "User registered successfully" });
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
   
    return res.status(200).send({ user, success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(200).send({ error: 'Internal Server Error' });
  }
});

// ... (existing code)


//get portfolio data
router.get('/get-portfolio-data/user/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const intros = await Intro.findOne({ ownerid: id });
    const abouts = await About.findOne({ ownerid: id });
    const projects = await Project.find({ ownerid: id });
    const contacts = await Contact.findOne({ ownerid: id });
    const experiences = await Experience.find({ ownerid: id });
    const sidebars = await Left.findOne({ ownerid: id });
    const academics = await Academic.find({ ownerid: id });
    const ideas = await Idea.find({ownerid:id })

    res.status(200).send({
      intro: intros,
      about: abouts,
      projects: projects,
      contact: contacts,
      experiences: experiences,
      left: sidebars,
      academics: academics,
      ideas: ideas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//Initial intro
router.post("/initialintro", async (req, res) => {
  const {ownerid,welcomeText,firstName,lastName,description,caption,image} = req.body
  try {
    const intro = new Intro({ownerid,welcomeText,firstName,lastName,description,caption,image});
    await intro.save()
    res.status(200).send({ message: "intro updated successfully" });
  }
  catch (error) {
    res.status(500).send(error);
  }
});
//update intro
router.post("/update-intro/:id", async (req, res) => {
  const  id  = req.params.id;
  const {welcomeText,firstName,lastName,description,caption} = req.body
  try {
    const updatedIntro = await Intro.findOneAndUpdate(
      { _id: req.body._id }, // Use the provided id to find the intro document
      {ownerid:id,welcomeText,firstName,lastName,description,caption},
      { new: true }
    );

    res.status(200).send({
      data: updatedIntro,
      success: true,
      message: "Intro updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//file upload
const storage= multer.diskStorage({
  destination: (req,file,cb)=> {
    cb(null,'users/images')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + "_"+Date.now()+ path.extname(file.originalname))
  }
})

const upload=multer({
  storage:storage
})

router.post('/upload/:id', upload.single('file'), async (req, res) => {
    
    const id = req.params.id;
    const image = req.file.filename;
    
  try{
    const userimage = await Intro.findOneAndUpdate(
      { ownerid:id },
      {image},
      { new: true }
    );
    // Update image in User model
    const user = await User.findOneAndUpdate(
      { id: id },
      { image },
      { new: true }
    );
    res.status(200).send({
      data: userimage,
      success: true,
      message: "Profile Photo updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});



//Initial about
router.post("/initialAbout", async (req, res) => {
  const {ownerid,description1,description2,skills} = req.body
  try {
    const about = new About({ownerid,description1,description2,skills});
    await about.save()
    
    res.status(200).send({ message: "About updated successfully" });
  }
  catch (error) {
    res.status(500).send(error);
  }
});


//update about
router.post("/update-about/:id", async (req, res) => {
  const id = req.params.id
  const {description1,description2,skills} = req.body
  
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },{description1,description2,skills,ownerid:id},
      { new: true }
    );
    
    // Update skills in User model
    const user = await User.findOneAndUpdate(
      { id: id },
      { skills },
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About updated successfully"
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});


//Initial value of sidebar

router.post("/initialsidebar", async (req, res) => {
  const {ownerid,fblink,gitlink,linkedinlink,instalink,maillink} = req.body
  try {
    const newLeft =  new Left({ownerid,fblink,gitlink,linkedinlink,instalink,maillink});
    await newLeft.save();
    res.status(200).send({message:"successfull" });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

//update sidebar link
router.post("/update-left/:id", async (req, res) => {
  const id=req.params.id
  const {fblink,gitlink,linkedinlink,instalink,maillink} = req.body
  try {
    const left = await Left.findOneAndUpdate(
      { _id: req.body._id },{fblink,gitlink,linkedinlink,instalink,maillink,ownerid:id},
      { new: true }
    );
    res.status(200).send({
      data: left,
      success: true,
      message: "Sidebar links updated successfully"
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

//initial contact
router.post("/initialcontact", async (req, res) => {
  const {ownerid,name,email,gender,age,mobile,address} = req.body
  try {
    const contact = new Contact({ownerid,name,email,gender,age,mobile,address});
    await contact.save()
    res.status(200).send({ message: "contact updated successfully" });
  }
  catch (error) {
    res.status(500).send(error);
  }
});


//update contacts
router.post("/update-contact/:id", async (req, res) => {
  const id=req.params.id
  
  const {name,email,gender,age,mobile,address} =req.body
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },{name,email,gender,age,mobile,address,ownerid:id},
      { new: true }
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Contacts updated successfully"
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

//add experience

router.post("/add-experience/:id", async (req, res) => {
  const { id } = req.params;
  const {title,period,company,description} =req.body
  
  try {
    const experience = new Experience({title,period,company,description,ownerid:id});
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully",
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

// update experience
router.post("/update-experience/:id", async (req, res) => {
  const {id} = req.params
  console.log("hai",id)
  const {title,period,company,description} = req.body
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },{title,period,company,description,ownerid:id},
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
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


// delete a user from User collection
router.post("/delete-user", async (req, res) => {
  try {
    // Find the user in the User collection by its ID and delete it
    const deletedUser = await User.findOneAndDelete({ _id: req.body._id });

    // If the user is successfully deleted, delete associated data
    if (deletedUser) {
      // Delete intro data
      await Intro.findOneAndDelete({ ownerid: deletedUser.id });

      // Delete about data
      await About.findOneAndDelete({ ownerid: deletedUser.id });

      // Delete experiences data
      await Experience.deleteMany({ ownerid: deletedUser.id });

      // Delete sidebar data
      await Left.findOneAndDelete({ ownerid: deletedUser.id });

      // Delete academic data
      await Academic.deleteMany({ ownerid: deletedUser.id });

      // Delete project data
      await Project.deleteMany({ ownerid: deletedUser.id });

      // Delete contact data
      await Contact.findOneAndDelete({ ownerid: deletedUser.id });

      // Send a success response
      return res.status(200).send({
        success: true,
        message: "User and associated data deleted successfully",
      });
    } else {
      // If the user is not found, send an error response
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    // If an error occurs, send a 500 internal server error response
    console.error(error);
    return res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});





//add project

router.post("/add-project/:id", async (req, res) => {
  const {id}=req.params
  const {title,image,description,link,technolgies} = req.body
  try {
    const project = new Project({title,image,description,link,technolgies,ownerid:id});
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

// update project
router.post("/update-project/:id", async (req, res) => {
  const {id}=req.params
  const {title,image,description,link,technolgies} = req.body
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },{title,image,description,link,technolgies,ownerid:id},
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
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add academics

router.post("/add-academic/:id", async (req, res) => {
  const {id}=req.params
  const {level,period,name,place,grade} = req.body
  try {
    const academic = new Academic({ownerid:id,level,period,name,place,grade});
    await academic.save();
    res.status(200).send({
      data: academic,
      success: true,
      message: "Details added successfully",
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

// update academics
router.post("/update-academic/:id", async (req, res) => {
  const {id}=req.params
  const {level,period,name,place,grade} = req.body
  try {
    const academic = await Academic.findOneAndUpdate(
      { _id: req.body._id },{level,period,name,place,grade},
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
router.post("/delete-academic", async (req, res) => {
  try {
    const academic = await Academic.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: academic,
      success: true,
      message: "Details deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
