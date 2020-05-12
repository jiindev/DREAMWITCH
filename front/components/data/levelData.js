export const levelCheck = (exp) => {
    if(exp>=200){
        return '대마녀';
    }else if(exp>=100){
        return '로얄마녀';
    }else if(exp>=50){
        return '일류마녀';
    }else if(exp>=25){
        return '베테랑마녀';
    }else if(exp>=10){
        return '용병마녀';
    }else if(exp>=5){
        return '견습마녀';
    }else if(exp>=1){
        return '초보마녀';
    }else return '풋내기마녀';
}