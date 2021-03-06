const { Router } = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const { Clinic, Staff } = require('../../../../models');
const faker = require('faker');

router.get('/', asyncHandler(async (req, res) => {
    const users = await Clinic.findAll();

    res.send({
        data: users
    })
}));

//post
router.get('/create', asyncHandler(async (req, res) => {
    const user = await Clinic.create({
        fullName: faker.name.findName(),
        sex: 'male',
        city: faker.address.city(),
        birth: faker.date.past(10, '2000-01-01'),
        phone: `+38 063 451 42 32`,
        email: faker.internet.email(),
        password: faker.internet.password(8)
    });

    res.send({
        data: user
    })
}));

// router.put('/:id', asyncHandler(async (req, res) => {
//     const article = await Articles.findOne({
//         where: {
//             id: req.params.id
//         }
//     });
//
//     if(req.session.user.id === article.authorId){
//         await article.update({
//             ...req.body
//         });
//
//         res.send({
//             data: article
//         });
//     }
//     res.send({
//         data: res.status(403).send('User is not an author.')
//     });
// }));



// router.delete('/:id', asyncHandler(async (req, res) => {
//     const article = await Articles.findOne({
//         where: {
//             id: req.params.id
//         }
//     });
//
//     if(req.session.user.id === article.authorId) {
//         await article.destroy(article);
//
//     }
//
//     res.send({
//         data: res.status(403).send('User is not an author.')
//     });
// }));



router.get('/:id', asyncHandler(async (req, res) => {
    const user = await Clinic.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Staff,
            as: 'staff'
        }]
    });

    res.send({
        data: user
    })
}));

module.exports = router;
