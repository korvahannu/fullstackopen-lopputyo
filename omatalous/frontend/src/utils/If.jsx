const If = ({condition, onConditionTrue, onConditionFalse}) => {

    if(condition)
        return onConditionTrue;
    else
        return onConditionFalse;

};

export default If;