const request = require('supertest');
const app = require("../server");

describe("GET /api/users ", () => {

  let response;
  let users;

  beforeAll(async () => {
    response = await request(app).get("/api/users");
    users = response.body.data.users;
  });

  test('Returns response status code 200', () => {
    expect(response.statusCode).toBe(200);
  });
    
  test("Returns 3 user", () => {
    expect(users.length).toBe(3);
  });

  test("Returns all user properties", () => {
    expect(users[0]).toHaveProperty("_id");
    expect(users[0]).toHaveProperty("firstName");
    expect(users[0]).toHaveProperty("lastName");
    expect(users[0]).toHaveProperty("email");
    expect(users[0]).toHaveProperty("password");
  });

});

describe("POST /api/users/signup", () => {

  const testUser = {
    "firstName": "test3",
    "lastName": "345",
    "email": "test3@example.com",
    "password": "test1234"
  }

  let response;
  let user;

  beforeAll(async () => {
    response = await request(app)
      .post("/api/users/signup")
      .send(testUser);
    user = response.body.data;
  });

  test('Returns response status code 200', () => {
    expect(response.statusCode).toBe(200);
  });

  test("Returns all user properties when created successfully", () => {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("firstName");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("email");
  });

  test("Returns new users lenth of 4", async () => {
    const mewResponse = await request(app).get("/api/users");
    expect(mewResponse.body.data.users.length).toBe(4);
  });

  test("Returns token when signed up successfully", () => {
    expect(response.body.token).toBeTruthy();
  });

  test("Fails when email is duplicated", () => {
    expect(response.body.status).toBe(false);
  });

  test("Fails when email is not valid", () => {
    expect(response.body.status).toBe(false);
  });

  test("Fails when password's length is less than 8", () => {
    expect(response.body.status).toBe(false);
  });

});

describe("POST /api/users/login", () => {

  const testUser = {
    "email": "test3@example.com",
    "password": "test1234"
  }

  let response;
  let user;

  beforeAll(async () => {
    response = await request(app)
      .post("/api/users/login")
      .send(testUser);
    user = response.body.data;
  });

  test('Returns response status code 200', () => {
    expect(response.statusCode).toBe(200);
  });

  test("Returns all user properties when logged in successfully", () => {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("firstName");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("email");
  });

  test("Returns token when logged in successfully", () => {
    expect(response.body.token).toBeTruthy();
  });

  test("Fails when email doesn't exist", () => {
    expect(response.body.status).toBe(false);
  });

  test("Fails when email is not valid", () => {
    expect(response.body.status).toBe(false);
  });

  test("Fails when password's length is less than 8", () => {
    expect(response.body.status).toBe(false);
  });

});
