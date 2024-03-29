// You will create a custom middleware function checkMillionDollarIdea 
// that will come in handy in some /api/ideas routes. Write this function 
// in the server/checkMillionDollarIdea.js file. This function will make 
// sure that any new or updated ideas are still worth at least one million 
// dollars! The total value of an idea is the product of its numWeeks and 
// weeklyRevenue properties.

const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body
    const total = numWeeks * weeklyRevenue
    if(total < 1000000 || !numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        res.sendStatus(400)
    }else{
        next()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
