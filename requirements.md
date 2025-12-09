simple node javascript based API testing framework
make http calls with axios
run tests with jest
have a request provider which can return a valid test request
 - main domain objects: provider, product, package, insurance
get acesss token from microsoft login with client id and secret, stored in an .env file
pre configure axios with authorize header
a single test should be as simple as
 - get a request from request provider
 - customize it
 - call a given url with a method (eg post /insurance/provider)
 - validate the response
tests should be chainable within a test file
all tests should be runnable with npm