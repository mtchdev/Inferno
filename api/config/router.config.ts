export const RouterConfig = {
    api_prefix: 'api', // The route prefix. For example: www.example.com/api/users (do not include /)
    api_version: 'v1', // The version of the API. For example: www.example.com/api/v1/users. LEAVE EMPTY/NULL for no version
    allowed_ips: [
        '::ffff:127.0.0.1',
        '127.0.0.1',
        '::1'
    ], // If not empty, the router will only allow specific IP addresses to make requests.
    log_requests: true // Whether to log all route requests in console.
}
