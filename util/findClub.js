const Club = require("../models/ClubModel");


async function findClub(userId){
    const club = await Club.findOne({
        raw: true,
        where: {
            fkUserId: userId
        }
    });

    return club;
}

module.exports = findClub;