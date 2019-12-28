const dialogflow = require('dialogflow');
const uuid = require('uuid');
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports={async runSample(userText, projectId = 'agent-name-1-wkryvn') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"./Agent-Name-1-49586d0e3051.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: userText,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return new Promise(function(resolve,reject){

    var myarray=[];
    // Send request and log result
    
    // console.log('Detected intent');
    console.log("responses[0].queryResult", responses[0].queryResult.fulfillmentMessages[0].basicCard)
    const result = responses[0].queryResult;
    // var Query=
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      // console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      // console.log(`  No intent matched.`);
    }
  
    myarray=[{'Query':`${result.queryText}`,'Response':`${result.fulfillmentText}`,'Intent':`${result.intent.displayName}`}]
    // console.log("return se phle myarray : ",myarray);
    resolve (myarray);

  });
 
}


// runSample()
};