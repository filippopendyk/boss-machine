const checkMillionDollarIdea = (req, res, next) => {
    const millionDollarIdea = ((Number(req.body.weeklyRevenue) * Number(req.body.numWeeks)) >= 1000000);
    if(millionDollarIdea){
        next();
    } else {
        return res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
