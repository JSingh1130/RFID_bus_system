const bcrypt = require("bcrypt");
const user = require("../models/user");
const admin = require("firebase-admin");



const database = admin.database();

// Landing Page Route
const loadLandingPage = async (req, res) => {
    try {
        res.render("index"); // Render the landing page
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading landing page.");
    }
};

// Login Page Route
const loadLogin = async (req, res) => {
    try {
        res.render("login"); // Render the login page
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading login page.");
    }
};

// User Logout
const userLogout = (req, res) => {
    try {
        req.session.destroy(); // Destroy the session on logout
        res.redirect("/login"); // Redirect to login page
    } catch (error) {
        console.log(error);
        res.status(500).send("Error logging out.");
    }
};

// Register Page Route
const loadRegister = async (req, res) => {
    try {
        res.render("register"); // Render the register page
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading register page.");
    }
};

// Create Account Page Route (example of authenticated route)
// Create Account Page Route (for authenticated users)
const loadCreate = async (req, res) => {
    try {
        // Assuming you have stored the user's ID in the session during login
        const userData = await user.findOne({ email: req.session.user_id });
        
        if (userData) {
            res.render("create", { user: userData }); // Pass user data to the template
        } else {
            res.redirect("/login"); // Redirect to login if user data is not found
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading create page.");
    }
};

// Update User Information Page Route
const loadUpdate = async (req, res) => {
    try {
        res.render("update"); // Render the update page (for authenticated users)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading update page.");
    }
};

// Find User Page Route
const loadFind = async (req, res) => {
    try {
        res.render("find"); // Render the find page (for authenticated users)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading find page.");
    }
};

// SmartPass Registration Page Route
const loadPass = async (req, res) => {
    try {
        res.render("pass", { message: "" }); // Pass an empty message by default
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading SmartPass page.");
    }
};

const loadRecharge = async (req, res) => {
    try {
        res.render("recharge", { message: "" }); // Pass an empty message by default
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading SmartPass page.");
    }
};

const loadCard = async (req, res) => {
    try {
        res.render("card", { message: "" }); // Pass an empty message by default
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading SmartPass page.");
    }
};

// SmartPass Registration with Firebase
// const registerWithFirebase = async (req, res) => {
//     try {
//         const { name, gender, dob, contact, address } = req.body;

//         if (!name || !gender || !dob || !contact || !address) {
//             return res.status(400).render("pass", { message: "All fields are required." });
//         }

//         const smartPassData = {
//             name,
//             gender,
//             dob,
//             contact,
//             address
//         };

//         // Use push() to generate a unique ID automatically for each new entry
//         const smartPassRef = database.ref("smartPassUsers").push();
//         await smartPassRef.set(smartPassData); // Ensure data is saved to Firebase

//         res.status(200).render("pass", { message: "SmartPass Registration Successful" });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).render("pass", { message: "Error saving SmartPass data, please try again." });
//     }
// };



// Handle User Login
const verifyLogin = async(req, res) => {
    try {

        let { email, password } = req.body;
        const userData = await user.findOne( {email: email} );

        if(userData){
            bcrypt.compare (password, userData.password)
                    .then(result => {
                        if (result) {
                            req.session.user_id = userData.email;
                            res.redirect("/create");
                        } 
                        else{
                            res.render("login", {message: "Email or password incorrect."});
                        }
                    })
                    .catch( err => {
                        console.log(err.message);
                    })
        }
        else{
            //emailid not in records
            res.render("login", {message: "Email or password incorrect."})
        }

    } catch (error) {
        console.log(error.message);
    }
}


const register = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        username = username.trim();
        email = email.trim();
        password = password.trim();
        
        const saltRounds = 10;
            bcrypt.hash (password, saltRounds)
            .then(hashedPassword => {
                const User = new user({
                    name: username,
                    email: email,
                    password: hashedPassword,
                })
                User.save()
                .then(result => {
                    res.render("register", {message: "Registered Successfully, Please Login"});
                })
                .catch(err => {
                    res.render("register", {message: "Error registering please try again after some time."});
                })
            })
            .catch(err => {
                    res.json({
                    Status: "FAILED",
                    Message: "ERROR occurred while hashing password!"
                })
            })
    } catch (error) {
        console.log(error.message);
    }
}


// Export all the functions
module.exports = {
    loadLandingPage,
    loadLogin,
    userLogout,
    loadRegister,
    loadCreate,
    loadUpdate,
    loadFind,
    loadPass,
    loadRecharge,
    loadCard,
    // registerWithFirebase,
    verifyLogin,
    register, // Export the login verification function
};
