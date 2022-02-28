// import Axios from "axios";
// import {
//   LOGIN_URL,
//   ME_URL,
//   REGISTER_URL,
//   REQUEST_PASSWORD_URL,
// } from "../_redux/authCrud";
// import userTableMock from "./userTableMock";

// function mockAuth(mock) {
//   mock.onPost(LOGIN_URL).reply(({ data }) => {
//     console.log("mock1" ,data );
//     const { national_id, password } = JSON.parse(data);
//     if (national_id && password) {
//       console.log("mock2");

//       var data = JSON.stringify({"api_key":"d025488f-8ec6-4434-afbe-b6a5343815a7","member_id":null,"token":null,"table":"login","method_type":"login","data":{"user":"","pass":""}});

//       var config = {
//         method: 'post',
//         url: 'http://192.168.73.64:7001/GradDB/V1/login',
//         headers: { 
//           'Content-Type': 'application/json'
//         },
//         data : data
//       };

//       console.log("config", config);

//       Axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         console.log("error:",error);
//       })
//       console.log("mock3");


//       // const user = userTableMock.find(
//       //   (x) =>
//       //     x.national_id.toLowerCase() === national_id.toLowerCase() &&
//       //     x.password === password
//       // );

//       let user = national_id

//       if (user) {
//         return [200, { ...user, password: undefined }];
//       }
//     }

//     return [400];
//   });

//   mock.onPost(REGISTER_URL).reply(({ data }) => {
//     const { email, fullname, username, password } = JSON.parse(data);

//     if (email && fullname && username && password) {
//       const user = {
//         id: generateUserId(),
//         email,
//         fullname,
//         username,
//         password,
//         firstname: fullname,
//         lastname: "Stark",
//         roles: [2], // Manager
//         authToken: "auth-token-" + Math.random(),
//         refreshToken: "auth-token-" + Math.random(),
//         pic: process.env.PUBLIC_URL + "/media/users/default.jpg",
//       };

//       userTableMock.push(user);

//       return [200, { ...user, password: undefined }];
//     }

//     return [400];
//   });

//   mock.onPost(REQUEST_PASSWORD_URL).reply(({ data }) => {
//     const { email } = JSON.parse(data);

//     if (email) {
//       const user = userTableMock.find(
//         (x) => x.email.toLowerCase() === email.toLowerCase()
//       );

//       if (user) {
//         user.password = undefined;

//         return [200, { ...user, password: undefined }];
//       }
//     }

//     return [400];
//   });

//   mock.onGet(ME_URL).reply(({ headers: { Authorization } }) => {
//     const authToken =
//       Authorization &&
//       Authorization.startsWith("Bearer ") &&
//       Authorization.slice("Bearer ".length);

//     if (authToken) {
//       const user = userTableMock.find((x) => x.authToken === authToken);

//       if (user) {
//         return [200, { ...user, password: undefined }];
//       }
//     }

//     return [401];
//   });

//   function generateUserId() {
//     const ids = userTableMock.map((el) => el.id);
//     const maxId = Math.max(...ids);
//     return maxId + 1;
//   }
// }
