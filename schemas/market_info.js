module.exports = {
    jobs: [{engineer: 100}, 
        {pimp: 200}, 
        {doctor: 300}, 
        {entrepreneur: 400}, 
        {cashier: 500},
    
    ],

    crimes: [{'robbed a bank': {min: 500, max: 2000}}, 
        {'put a hit out': {min: 2000, max: 3000}},
        {'were a prostitute': {min: 300, max: 500}}

    ],

    // rent per day
    houses: {
        "singlefamily": {price: 100000, rent: 2500},
        "townhome": {price: 200000, rent: 6000},
        "officebuilding": {price: 500000, rent: 15000},
        "apartmentbuilding": {price: 1000000, rent: 30000}
    },
    
    items: {
        'sword': 10000,
        'shield': 20000,
        'lance': 5000,
        'helm': 20000,
    },

    // days * hours * minutes * seconds * milliseconds
    times: {
        one_day: 1 * 24 * 60 * 60 * 1000,
        one_hour: 60 * 60 * 1000,
        one_minute: 60 * 1000

        /*
        var OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
                                     day hour  min  sec  msec
        if (OneDay > yourDate) {
            // The yourDate time is less than 1 days from now
        }
        else if (OneDay < yourDate) {
            // The yourDate time is more than 1 days from now
        }
        */
    },

    spins: {
        'newSingleFamlily': 0.01,
        '50000': 0.05,
        '25000': 0.1,
        '10000': 0.3,
        '5000': 0.54, 
    },

}

