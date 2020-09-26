(function(window){
    var fs = require("fs");

    function Model(){
        this.localData = [];
    }

    Model.prototype.saveData = function(callBack){
        callBack = (callBack || function(){});

        fs.writeFileSync("list.dat", JSON.stringify(this.localData), "utf8");
        callBack();
    }

    Model.prototype.init = function(callBack){
        callBack = (callBack || function(){});

        var data;
        try{
            data = fs.readFileSync("list.dat", "utf8");
        }
        catch(error){
            return;
        }
        var loadedData = JSON.parse(data);

        for(var i=0; i<loadedData.length; i++){
            callBack(loadedData[i].Data);
        }
    }

    Model.prototype.addItem = function(id, data, callBack){
        callBack = (callBack || function(){});

        this.localData.push({Id: id, Data: data});
        this.saveData(callBack);
    }

    Model.prototype.deleteItem = function(id, callBack){
        callBack = (callBack || function(){});

        var pointer = 0;
        var checked = false;
        for(; pointer<this.localData.length; pointer++){
            if(this.localData[pointer].Id == id){
                checked = true;
                break;
            }
        }
        if(checked){
            for(; pointer<(this.localData.length-1); pointer++){
                this.localData[pointer] = this.localData[pointer+1];
            }
            this.localData.length -= 1;
            this.saveData(callBack);
        }
    }

    Model.prototype.changeItem = function(id, data, callBack){
        callBack = (callBack || function(){});

        for(var i=0; i<this.localData.length; i++){
            if(this.localData[i].Id == id){
                this.localData[i].Data = data;
                break;
            }
        }
        this.saveData(callBack);
    }

    window.app = (window.app || {});
    window.app.Model = Model;
})(window);