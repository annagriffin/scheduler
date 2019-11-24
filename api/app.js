const express = require('express');
const { mongoose } = require('./db/mongoose');
const app = express();
const bodyParser = require('body-parser');

const { Course } = require('./db/models');
const { CourseListing } = require('./db/models');
const { Requirement } = require('./db/models');


// middleware
app.use(bodyParser.json());


// CORS HEADER
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
  });

// // GET /lists/
// // get all lists
// app.get('/lists', (req, res) => {
//     // return array of all of the lists
//     List.find().then((lists) => {
//         res.send(lists);
//     }).catch((e) => {
//         res.send(e);
//     });

// });

// // POST /lists
// // create new list
// app.post('/lists', (req, res) => {
//     // create new list and return list back to user
//     let title = req.body.title;
//     let newList = new List({
//         title
//     });

//     newList.save().then((listDoc) => {
//         res.send(listDoc);
//     });
// });

// // PATCH /lists/:id
// // update list
// app.patch('/lists/:id', (req, res) => {
//     // update specified list with new values

//     List.findOneAndUpdate({ _id: req.params.id}, {
//         $set: req.body
//     }).then(() => {
//         res.sendStatus(200);
//     });
// });
// can add fucntion to get a specific task from a specific list
// in video 3 in the last 5 minutes
// would be used when wanting to get task document with the
// list id and the task id and the title


// // DELETE /lists/:id
// // delete list
// app.delete('/lists/:id', (req, res) => {
//     // delete specified list
//     List.findOneAndRemove({
//         _id: req.params.id
//     }).then((removedListDoc) => {
//         res.send(removedListDoc);
//     });
// });




// GET /courses
// get all courses
app.get('/courses', (req, res) => {
    // return array of all of the lists
    Course.find().then((courses) => {
        res.send(courses);
    }).catch((e) => {
        res.send(e);
    });

});

app.get('/courses/requirements', (req, res) => {
    Course.find().then((courses) => {
        var courseTags = [];
        for (var c of courses) {
            if (c['tag']) {
                courseTags.push(c['tag']);
            }
        }
        res.send(courseTags);
    }).catch((e) => {
        res.send(e);
    });
});


app.get('/courses/:year', (req, res) => {
    Course.find({year: req.params.year}).then((list) => {
        res.send(list);

    }).catch((e) => {
        res.send(e);
    });
});

app.get('/course-listings', (req, res) => {
    // return array of all of the lists
    CourseListing.find().then((courseListings) => {
        res.send(courseListings);
    }).catch((e) => {
        res.send(e);
    });

});

app.get('/requirements', (req, res) => {
    Requirement.find().then((requirements) => {
        res.send(requirements);
    }).catch((e) => {
        res.send(e);
    });
});


app.post('/requirements', (req, res) => {
    let name = req.body.name;
    let status = req.body.status;
    let newRequirement = new Requirement({
        name,
        status
    });
    newRequirement.save().then((requirementDoc) => {
        res.send(requirementDoc);
    });
});


app.get('/course-listings/search/:query', (req, res) => {
    CourseListing.find({name: { $regex: '\\b' + req.params.query, $options: "i"}}).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.send(e);
    });
});


// POST /courses
// create new course
app.post('/courses', (req, res) => {
    // create new list and return list back to user
    let name = req.body.name;
    let tag = req.body.tag;
    let year = req.body.year;
    let credits = req.body.credits;
    let newCourse = new Course({
        name,
        tag,
        credits,
        year
    });
    newCourse.save().then((courseDoc) => {
        res.send(courseDoc);
    });
});

app.post('/course-listings', (req, res) => {
    let name = req.body.name;

    let newCourseListing = new CourseListing({
        name
    });
    newCourseListing.save().then((courseListingDoc) => {
        res.send(courseListingDoc);
    });
})


app.patch('/courses/:id', (req, res) => {
    Course.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({'message': 'updated successfully'});
    });
});

app.delete('/courses/:id', (req, res) => {
    // delete specified list
    Course.findOneAndRemove({
        _id: req.params.id
    }).then((removedCourseDoc) => {
        res.send(removedCourseDoc);
    });
});

app.delete('/course-listings/:id', (req, res) => {
    // delete specified list
    CourseListing.findOneAndRemove({
        _id: req.params.id
    }).then((removedCourseListingDoc) => {
        res.send(removedCourseListingDoc);
    });
});



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})