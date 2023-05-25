let user = {
    level: 10,
    name: 'Tomek'
}

class userProxyHandler {
    get(target, property){
        console.log(`Calling get of property ${property}`);
        return target;
    } 
    set(target, property, value){
        debugger;
        if(property === 'level' && typeof(value) !== 'number' ){
            throw new TypeError('Level can only be a number. Your value was '+ `${value}`);
        }
        target[property] = value;
        return true;
    }
}
let proxyHandler = new userProxyHandler();
let userProxy = new Proxy(user,proxyHandler);

userProxy.level;
userProxy.level = 'text';
