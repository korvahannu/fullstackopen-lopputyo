const If = (props) => {

    if(!props.condition)
        return null;

    return props.children;
};

export default If;