import React from "react";


// 属性的默认值的使用

interface MyProps {
    a: string //必选
    b: string //必选
}

class Test extends React.Component<MyProps> {
    static defaultProps: Pick<MyProps,"a"> = {
        a: "123"
    }
}

class User extends React.Component{
    render(){
        return (
            // <Test a="jdf" b="djof"/>
             <Test b="djof"/>
        )
    }
}


export default {};