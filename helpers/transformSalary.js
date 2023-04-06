const transformSalary = (minion) => {
    if(typeof minion.salary === 'string'){
        minion.salary = Number(minion.salary);
        return minion;
    }
    if(!minion.salary){
        return minion;
    }
    return minion;
};

module.exports = transformSalary;