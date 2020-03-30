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
    }
}