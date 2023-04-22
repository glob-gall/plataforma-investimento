const nookiesConfig = {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    secure: process.env.NEXT_PUBLIC_STAGE !== 'develop',
}

export default nookiesConfig
