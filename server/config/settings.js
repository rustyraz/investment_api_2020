export default {
    jwtSignOptions: {
        issuer: 'MyCompany Corp',
        subject: 'admin@mycompany.com',
        audience: 'http://mycompany.com',
        expiresIn: "30s",
        algorithm: "RS256"
    },
    jwtVerifyOptions: {
        issuer: 'MyCompany Corp',
        subject: 'admin@mycompany.com',
        audience: 'http://mycompany.com',
        expiresIn: "30s",
        algorithm: ["RS256"]
    },
    fcsapi :{
        forex_api_key : 'kiIDszLmYCoeudVJf6z1ifZUGoR5gc7AdQSXBPdFCOotuVIkGK',
        base_url: 'https://fcsapi.com/api-v2/forex/'
    }
    
}