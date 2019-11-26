const express = require('express');
const { mongoose } = require('./db/mongoose');
const app = express();
const bodyParser = require('body-parser');

const { Course } = require('./db/models');
const { CourseListing } = require('./db/models');
const { Requirement } = require('./db/models');
const { User } = require('./db/models');


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


  // verify refresh token
let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
          return Promise.reject({
              'error': 'User not found.'
          });
        }

        // user was found
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                  isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': 'refresh token has expired or session has expired'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    });
}


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

app.patch('/requirements/:id', (req, res) => {
    Requirement.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({'message': 'updated successfully'});
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

app.delete('/requirements/:id', (req, res) => {
    Requirement.findOneAndRemove({
        _id: req.params.id
    }).then((removedRequirementDoc) => {
        res.send(removedRequirementDoc);
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

// user routes

app.post('/users', (req, res) => {
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken };
        });
    }).then((authTokens) => {
        // send responses to the user
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.post('/users/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findByCredentials(username, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // session created
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})


app.get('/users/me/access-token', verifySession, (req, res) => {
    // user is authenticated and have id available and user object
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})