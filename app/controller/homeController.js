

class HomeController{

    async index(req,res){

        const user={
            name:"John Doe",
            age:30
        }
        res.render('home',{
            title:"Home Page",
            user:user
        });
    }



    async about(req,res){
        res.render('about',{
            title:"About Us Page"

        });
    }
}



module.exports=new HomeController();