

class HomeController{

    async index(req,res){

        const user={
            name:"John Doe",
            age:30
        }
        res.send(`Welcome to Home page. User: ${user.name}, Age: ${user.age}`)
    }
}



module.exports=new HomeController();