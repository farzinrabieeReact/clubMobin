/*
 Copyright 2016 Lightstreamer s.r.l.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
let i = 0;

 
define(["LightstreamerClient" ],function(LightstreamerClient) {
  //prepare the LightstreamerClient we'll use to connect to the server
  
  // var lsClient = new LightstreamerClient("http://192.168.73.11:8090", "MARKETMAP_ADAPTERS");

  const validate = (resualt , RandomNumber,max_connections)=>{
    // console.log("max_connections" , max_connections)
    const {token} = resualt;

    var lsClient = new LightstreamerClient("http://192.168.73.11:8090", "MARKETMAP_ADAPTERS");
    lsClient.connectionDetails.setUser(RandomNumber)
    lsClient.connectionDetails.setPassword(token)
    ++i

    console.log('i',i)
    // if(i <= max_connections){
      // console.log("lsClient.connect" , i)
      lsClient.connect();
      return lsClient
    // }
    // return null
  }


  return validate;
});


