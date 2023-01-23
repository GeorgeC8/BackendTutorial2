const express = require('express');
const { send } = require('process');
const app = express();
app.use(express.json());
app.get('/', (req,res)=> {
    res.send('Hello there');
})

cOnst courses = [
    {id: 1, name:'Web Development'},
    {id: 2, name:'IT'}, 
    {id: 3, name:'Cybersecurity'},
];
// HTTP GET Requests route
app.get('/api/courses', (req,res)=> {
    res.send(courses);
})
// HTTP POST Requests
app.post('/api/courses', (req,res) => {
    if(req.body.name && req.body.name.length > 4) { 
        const course = {
            
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }
    else { 
        res.status(400).send('Must Be At Least 5 letters')
    }
});
//request course by ID
app.get('/api/courses/:id',(req,res)=>{ 
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) { 
        res.status(404).send("ERROR COURSE NOT FOUND");
        return
    }
    res.send(course);
})
app.put('/api/courses/:id', (req,res)=> { 
    if(req.body.name && req.body.name.length > 4) { 
        const course = courses.find(c=> c.id === parseInt(req.params.id));
        if(!course) { 
            res.status(404).send("ERROR COURSE NOT FOUND");
            return;
        }
        course.name = req.body.name;
        course.id = req.body.id;
        res.send(course);
    }
    else { 
        res.status(400).send('Must Be At Least 5 letters')
    }
})
app.delete('/api/courses/:id', (req,res)=> { 
    const course = courses.find(c=> c.id === parseInt(req.params.id));
        if(!course) { 
            res.status(404).send("ERROR COURSE NOT FOUND");
            return;
        }
        courses.splice(courses.indexOf(course), 1);
        res.send(course);
})
app.listen(3000, () => {
    console.log('Listening on port 3000...')
})
