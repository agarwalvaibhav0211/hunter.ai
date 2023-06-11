module.exports=function(mongoConfig,db){
    // var flag=false,temp;
    // if(mongoConfig["db"]){
    //     temp=mongoConfig["db"];
    //     delete mongoConfig["db"];
    //     flag=true;
    // }
    var uri;
    if(mongoConfig["srv"]==false){
        if(db){
            if(mongoConfig["auth"]){
                uri="mongodb://"+mongoConfig["username"]+":"+encodeURIComponent(mongoConfig["password"])+"@"+mongoConfig["host"]+":"+mongoConfig["port"]+"/"+db+"?authSource="+mongoConfig["authDB"];
            }else{
                uri="mongodb://"+mongoConfig["host"]+":"+mongoConfig["port"]+"/"+db;
            }
        }
        else{
            if(mongoConfig["auth"]){
                uri="mongodb://"+mongoConfig["username"]+":"+encodeURIComponent(mongoConfig["password"])+"@"+mongoConfig["host"]+":"+mongoConfig["port"]+"/?authSource="+mongoConfig["authDB"];
            }else{
                uri="mongodb://"+mongoConfig["host"]+":"+mongoConfig["port"];
            }
        }
    }else{
        if(db){
            if(mongoConfig["auth"]){
                uri="mongodb+srv://"+mongoConfig["username"]+":"+encodeURIComponent(mongoConfig["password"])+"@"+mongoConfig["host"]+"/"+db+"?authSource="+mongoConfig["authDB"];
            }else{
                uri="mongodb+srv://"+mongoConfig["host"]+"/"+db;
            }
        }
        else{
            if(mongoConfig["auth"]){
                uri="mongodb+srv://"+mongoConfig["username"]+":"+encodeURIComponent(mongoConfig["password"])+"@"+mongoConfig["host"]+"/?authSource="+mongoConfig["authDB"];
            }else{
                uri="mongodb+srv://"+mongoConfig["host"];
            }
        }
    }
    
    // if(flag){
    //     mongoConfig["db"]=temp;
    // }
    return uri;
}