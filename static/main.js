class Profile {
    constructor({
        username,
        name: {
            firstName,
            lastName
        },
        password
    }) {
        this.username = username;
        this.name = {
            firstName,
            lastName,
        };
        this.password = password;
    }

    newUser(callback) {
        return ApiConnector.createUser({
                username: this.username,
                name: this.name,
                password: this.password,
            },
            (err, data) => {
                console.log(`Creating user ${this.username}`);
                callback(err, data);
            }
        );
    }

    addMoney({
        currency,
        amount
    }, callback) {
        return ApiConnector.addMoney({
            currency,
            amount
        }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    authorization(callback) {
        return ApiConnector.performLogin({
            username: this.username,
            password: this.password
        }, (err, data) => {
            console.log(`login: ${this.username} password:${this.password}`);
            callback(err, data);
        });
    }

    convertMoney({
        fromCurrency,
        targetCurrency,
        targetAmount
    }, callback) {
        return ApiConnector.convertMoney({
            fromCurrency,
            targetCurrency,
            targetAmount
        }, (err, data) => {
            console.log(data, err);
            console.log(`convert from ${fromCurrency} to ${targetCurrency}. to amount = ${targetAmount}`);
            callback(err, data);
        });
    }

    transferMoney({
        to,
        amount
    }, callback) {
        return ApiConnector.transferMoney({
            to,
            amount
        }, (err, data) => {
            console.log(`transfering ${amount} to ${to} from ${this.username}`);
            callback(err, data);
        });
    }

}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks information`);
        callback(err, data);
    });
}

function main() {

    const Sheeraz = new Profile({
        username: 'sheeraz',
        name: {
            firstName: 'Sheeraz',
            lastName: 'Hafeez'
        },
        password: 'sheerazs123'
    });

    Sheeraz.newUser((err, data) => {
        if (err) {
            console.error('Error during creating user Sheeraz')
        } else {
            console.log(`User Sheeraz has been created`);
            Sheeraz.authorization((err, data) => {
                if (err) {
                    console.error('Error during loging in user Sheeraz')
                } else {
                    console.log(`User Sheeraz has been logged in`);
                    Sheeraz.addMoney({
                        currency: 'EUR',
                        amount: 0
                    }, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Sheeraz')
                        } else {
                            console.log('Money has been added to Sheeraz');
                            Sheeraz.convertMoney({
                                fromCurrency: 'EUR',
                                targetCurrency: 'NETCOIN',
                                targetAmount: 30000
                            }, (err, data) => {
                                if (err) {
                                    console.error('Error during converting money for Sheeraz');
                                } else {
                                    console.log('Money has been converted for Sheeraz');

                                }
                            });
                        }
                    });
                }
            });
        }
    });

    const Ivan = new Profile({
        username: 'ivan',
        name: {
            firstName: 'Ivan',
            lastName: 'Chernyshev'
        },
        password: 'ivan123'
    });

    Ivan.newUser((err, data) => {
        if (err) {
            console.error('Error during creating user Ivan')
        } else {
            console.log(`User Ivan has been created`);
            Ivan.authorization((err, data) => {
                if (err) {
                    console.error('Error during loging in user Ivan');
                } else {
                    console.log(`User Ivan has been logged in`);
                    Ivan.addMoney({
                        currency: 'EUR',
                        amount: 30000
                    }, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Ivan');
                        } else {
                            console.log('Money has been added to Ivan');
                            Ivan.convertMoney({
                                fromCurrency: 'EUR',
                                targetCurrency: 'NETCOIN',
                                targetAmount: 30000
                            }, (err, data) => {
                                if (err) {
                                    console.error('Error during converting money for Ivan')
                                } else {
                                    console.log('Money has been converted for Ivan');
                                    Ivan.transferMoney({
                                        to: 'sheeraz',
                                        amount: 30000
                                    }, (err, data) => {
                                        (err) ? console.error('Error during transfer money to Sheeraz'): console.log(`User Sheeraz transfered money`);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

}

main();