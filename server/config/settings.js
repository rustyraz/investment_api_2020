export default {
    jwtSecret : 'sometopsecretkeyforjsonwetoken',
    jwtSignOptions: {
        issuer: 'MyCompany Corp',
        subject: 'pngesh@mycompany.com',
        audience: 'http://mycompany.com',
        expiresIn: "12h",
        algorithm: "RS256"
    },
    jwtVerifyOptions: {
        issuer: 'MyCompany Corp',
        subject: 'pngesh@mycompany.com',
        audience: 'http://mycompany.com',
        expiresIn: "12h",
        algorithm: ["RS256"]
    }
}