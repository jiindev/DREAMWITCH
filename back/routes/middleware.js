const db = require('../models');

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
}

exports.historyExists = async(req, res, next)=>{
    try{
        const history = await db.History.findOne({
            where:{id:req.params.id}
        });
        if(!history){
            return res.status(404).send('존재하지 않는 히스토리입니다.');
        }
        req.history = history;
        next();
    }catch(e){
        console.error(e);
        return next(e);
    }
}