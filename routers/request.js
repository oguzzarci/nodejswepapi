//express'i kullanarak bir router tanımlıyoruz.
const router = require("express").Router();
const opentracing = require('opentracing')
const {initTracer} = require('jaeger-client')

//router'i kullanarak get veya post ile gelecek istekleri karşılayacağız.


//set up our tracer
const config = {
    serviceName: 'shipping',
    reporter: {
      logSpans: true,
      collectorEndpoint: 'http://10.100.78.92:14268/api/traces',
    },
    sampler: {
      type: 'const',
      param: 1
    }
  };
  const options = {
    tags: {
      'shipping.version': '3.1.2'
    }
  };


const tracer = initTracer(config, options);


// /getData url ile get işlemi yapıldığında.
router.get('/getdata',async(req,res)=> {

    const parentSpan = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers)

   // res.json({
   //     message:"Hello teknodice.com!"
   // })

    const span = tracer.startSpan("fetching shipping info from USPS", {
        childOf: parentSpan,
        tags: {
            [opentracing.Tags.COMPONENT]: "shipping"
        }
    })

    if (Math.random() > 0.3) {
      res.json({
        status: "delivered"
      })
    } else {
      span.setTag(opentracing.Tags.ERROR, true)
      res.status(503).send("External Shipping API unavailable")
    }

    span.finish()
})







// req : api'e gönderdiğimiz veri
// res : gelen isteğe geri gönderidiğimiz cevap.
router.post('/login',async(req,res)=>{


    console.log(req.body)


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