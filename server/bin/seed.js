const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const faker = require('faker')


const Publication = require('./../models/publication.model')
const User = require('./../models/user.model')
const Commentary = require('./../models/commentary.model')


mongoose.connect(`mongodb://localhost/dot-env`, { useNewUrlParser: true, useUnifiedTopology: true })
Publication.collection.drop()
User.collection.drop()




const userList = []
const userAvatars = ['https://res.cloudinary.com/manager00/image/upload/v1608204218/Avatars/unsplash8_xidcwf.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204218/Avatars/ben-parker-OhKElOkQ3RE-unsplash_ygjgb3.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204218/Avatars/unsplash6_p3g6md.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204217/Avatars/unsplash4_cq9ik0.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204215/Avatars/unsplash1_yxaros.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204215/Avatars/unsplash7_xjsjdm.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204215/Avatars/unsplash3_smy0qa.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204215/Avatars/unsplash2_nm2u6z.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204215/Avatars/unsplash5_kgckdt.jpg']

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
        avatar: userAvatars[Math.round(Math.random() * (userAvatars.length - 1))],
    })
}



const imagePosts = ['https://res.cloudinary.com/manager00/image/upload/v1608204175/Publications/unsplash11_t80u9k.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204174/Publications/unsplash10_ecfsvq.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204174/Publications/unsplash3_yrn2jz.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204174/Publications/unsplash2_miv8sv.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204174/Publications/unsplash9_xlp35k.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204174/Publications/unsplash8_tpogl2.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204171/Publications/unsplash1_yyxibx.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204171/Publications/unsplash12_e3gdkh.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204171/Publications/unsplash6_etx6rb.jpg',
                    'https://res.cloudinary.com/manager00/image/upload/v1608204170/Publications/unsplash7_wetkrj.jpg', 'https://res.cloudinary.com/manager00/image/upload/v1608204170/Publications/unsplash4_ptpab3.jpg']
const associatedPublications = []
const everyTag = ['Web design', 'Cybersecurity', 'Data analytics', 'Digital marketing', 'UX / UI design', 'Dev tools']


User
    .create(userList)
    .then(fillUsers => {
        for (let i = 0; i < 50; i++) {
            console.log(`CREATING PUBLICATIONS: ${i + 1}`)
            associatedPublications.push({
                title: faker.lorem.words(6),
                subTitle: faker.lorem.words(8),
                bodyText: faker.lorem.paragraphs(30),
                imageUrl: imagePosts[Math.round(Math.random() * (imagePosts.length - 1))],
                tag: everyTag[Math.round(Math.random() * (everyTag.length - 1))],
                author: fillUsers[Math.round(Math.random() * (fillUsers.length - 1))]._id,
                commentaries: []
        })}
        return Publication.create(associatedPublications)})
    
    .then(createdPublications => {
        console.log(`CREATING USERS: ${userList.length}`)
        const publicationsPromises = []
        createdPublications.forEach(elm => publicationsPromises.push(User.findByIdAndUpdate(elm.author,
            
            {$push:{publications: elm._id}}, {useFindAndModify: false})))

        return Promise.all(publicationsPromises)})
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))