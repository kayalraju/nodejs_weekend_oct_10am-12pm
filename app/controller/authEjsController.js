
const User=require('../model/user')
const bcrypt=require('bcryptjs') 
const jwt=require('jsonwebtoken')   
class AuthEjaController{


     async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login/view');
            }
        } catch (err) {
            console.log(err)
        }
    }

    async registerView(req,res){
        try{
            res.render('register')
        }catch(error){
            console.log(error);
            
        }
    }

    async register(req,res){
        try{
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            })
            const result = await user.save()
            console.log('data', result);

            if (result) {

                console.log('register successfully');

                res.redirect('/login/view')
            } else {
                console.log('register failed');

                res.redirect('/register/view')
            }

        }catch(error){
            console.log(error);
            
        }   
    }


    async loginView(req,res){
        try{
            res.render('login')
        }catch(error){
            console.log(error);
            
        }
    }
    async logincreate(req,res){
        try{
           // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                console.log('All input is required');
                res.redirect('/login/view');
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && user.is_admin==='user'&&(await bcrypt.compare(password, user.password))) {
                // Create token
                const tokendata = jwt.sign(
                        {
                         user_id: user._id,
                         email:user.email,
                         name:user.name
                        },
                    process.env.JWT_SECRECT || "1234",
                    {
                        expiresIn: "2h",
                    }
                )
                if (tokendata) {
                    res.cookie('userToken', tokendata)
                    res.redirect('/user/dashboard');
                } else {
                    console.log('login failed');
                }
            }
            console.log('login failed');
            res.redirect('/login/view');
        }catch(error){
            console.log(error);
            
        }
    }

    async dashboardView(req,res){
        return res.render('dashboard',{
            user:req.user
        })
    }

    async logout(req,res){
        try{
            res.clearCookie('userToken')
            res.redirect('/login/view')
        }catch(error){
            console.log(error);
            
        }
    }

}



module.exports=new AuthEjaController()