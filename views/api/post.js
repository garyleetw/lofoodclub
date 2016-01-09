'use strict';

exports.readPost = function(req, res, next) {
};

exports.createPost = function(req, res, next) {
  var workflow = req.app.utility.workflow(req, res);
  var title = req.body.title;
  var message = req.body.message;
  var fieldsToSet;

  workflow.on('validate', function() {
  	fieldsToSet = {
  		title: title,
  		message: message

  	};

  	workflow.emit('save');
  });
  
  workflow.on('save', function() {
  	req.app.db.models.Post.create( fieldsToSet, function(err, post) {
  		if (err) {
  			return workflow.emit('exception', err);
  		}
  		workflow.outcome.post = post;
  		workflow.emit('response');

  	});

  });

  return (workflow.emit('validate'));
};

exports.readPostById = function(req, res, next) {

};

exports.readPostBySubject = function(req, res, next) {

};

exports.updatePost = function(req, res, next) {

}

exports.publish = function(req, res, next) {

}

exports.unpublish = function(req, res, next) {

}
