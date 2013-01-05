describe('user registration process', function() {

  it('should create a new user', function(){
    request("http://localhost:3000/hello", function(error, response, body){
        expect(body).toEqual("hello world");
        done();
      });
  });

  it('shows asynchronous test', function() {
    setTimeout(function(){
      expect('second').toEqual('second');
      asyncSpecDone();
    }, 1);
    expect('first').toEqual('first');
    asyncSpecWait();
  });

  it('shows asynchronous test node-style', function(done){
    setTimeout(function(){
      expect('second').toEqual('second');
      // If you call done() with an argument, it will fail the spec
      // so you can use it as a handler for many async node calls
      done();
    }, 1);
    expect('first').toEqual('first');
  });
});
