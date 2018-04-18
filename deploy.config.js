module.exports = {

    prodPath:"/pmkoo/",
    prodHost: [
        {
            host: '114.115.151.10',
            username: 'root',
            password: '56os.com',
            agent: process.env.SSH_AUTH_SOCK
        }
    ]
    //,
    // devHost:[
    //     {
    //         host: 'pmkoo.com',
    //         username: 'root',
    //         password: 'Zheli123!!@#%*!#@!',
    //         agent: process.env.SSH_AUTH_SOCK
    //     }

        // {
        //     host: '47.92.132.103',
        //     username: 'root',
        //     password: 'Zheli123!!@#%*!#@!',
        //     agent: process.env.SSH_AUTH_SOCK
        // }
    //]
}