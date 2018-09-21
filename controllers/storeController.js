const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    // res.send('Hey! It works!');
    res.render('index',{
        title: 'I love food'
    })
};

exports.addStore = (req, res) => {
    res.render('editStore',{title: 'ADD STORE'});
};

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', 'Store successfuly created');
    res.redirect(`/store/${store.slug}`);
};

exports.getStore = async (req, res) => {
    const stores = await Store.find();
    res.render('stores',{ title: 'Stores', stores })
};

exports.editStore = async (req, res) => {
    const store = await Store.findOne({_id: req.params.id});
    res.render('editStore',{title: `EDIT ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    }).exec();
    req.flash('success', `Store successfuly update <a href="/store/${store._id}">View store -></a>`);
    res.redirect(`/stores/${store._id}/edit`);
};