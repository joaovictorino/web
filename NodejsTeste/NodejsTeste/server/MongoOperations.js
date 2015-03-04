var mongoose = require('mongoose');
mongoose.connect("mongodb://192.168.56.101/test");
var db = mongoose.connection;
var SchemaEntidade = mongoose.Schema({ Name: String });
var EntidadeModel = mongoose.model('entities', SchemaEntidade);

exports.fetch = function (request, response) {
    EntidadeModel.find().exec(function (err, res) {
        if (err) {
            response.send(500, { error: err });
        } else {
            response.send(res);
        }
    });
};

exports.add = function (request, response) {
    var novo = { Name: request.body.Name };
    EntidadeModel.create(novo, function (addError, novoAdicionado) {
        if (addError) {
            response.send(500, { error: addError });
        } else {
            response.send({ success: true, entidade: novoAdicionado });
        }
    });
};

exports.modify = function (request, response) {
    var id = request.params.entidadeID;
    EntidadeModel.update({ _id: entidadeID }, { Name: request.body.Name }, { multi: false }, function (error, rowsAffected) {
        if (error) {
            response.send(500, { error: error });
        } else if (rowsAffected == 0) {
            response.send(500, { error: "Nenhuma linha encontrada" });
        } else { 
            response.send(200);
        }
    })
}