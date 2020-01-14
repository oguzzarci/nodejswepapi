//express'i kullanarak bir router tanımlıyoruz.
const router = require("express").Router();

//router'i kullanarak get veya post ile gelecek istekleri karşılayacağız.

// /getData url ile get işlemi yapıldığında.
router.get('/getdata',async(req,res)=> {

    res.json({
        message:"Hello teknodice.com!"
    })
})

// req : api'e gönderdiğimiz veri
// res : gelen isteğe geri gönderidiğimiz cevap.
router.post('/login',async(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    if(username === "admin" && password ==="admin"){
        res.json({
            status:"OK",
            login:"true"
        })
    }else{
        res.json({
            status:"fail",
            login:"false"
        })
    }

})

module.exports = router;