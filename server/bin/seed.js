const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const faker = require('faker')


const Publication = require('./../models/publication.model')
const User = require('./../models/user.model')
const Commentary = require('./../models/commentary.model')


mongoose.connect(`mongodb://localhost/dot-env`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Publication.collection.drop()
// User.collection.drop()
// Commentary.collection.drop()

const userList = []

const userAdmin = {
    name: 'Carlos Garcia',
    username: 'CarlosG',
    email: 'management@dotenv.com',
    password: bcrypt.hashSync('password', salt),
    userType: 'Admin'
}

userList.push(userAdmin)

for (let i = 0; i < 10; i++) {

    userList.push({
        name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), salt),
        userType: 'User',
        avatar: faker.image.avatar(),
    })
}



const associatedPublications = []
const everyTag = ['Web design', 'Cybersecurity', 'Data analytics', 'Digital marketing', 'UX / UI Design', 'Developement tools']


User
    .create(userList)
    .then(fillUsers => {

        for (let i = 0; i < 50; i++) {
            console.log('CREATING PUBLICATIONS')
            associatedPublications.push({
                title: faker.lorem.sentence(),
                subTitle: faker.lorem.sentence(),
                bodyText: faker.lorem.paragraphs(5),
                imageUrl: faker.internet.avatar(),
                tag: everyTag[Math.round(Math.random() * (everyTag.length - 1))],
                author: fillUsers[Math.round(Math.random() * (fillUsers.length - 1))]._id,
                commentaries: []
            })
        }
        return Publication.create(associatedPublications)
    })
    .then(createdPublications => {
        console.log('UPDATING USERS')
        const publicationsPromises = []
        createdPublications.forEach(elm => publicationsPromises.push(User.findByIdAndUpdate(elm.author, {
            $push: {
                publications: elm._id
            },
        })))

        return Promise.all(publicationsPromises)
    })
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))