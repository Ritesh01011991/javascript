PS C:\Users\1673986\Desktop\lafarge-ce-express> node server
Listening on port 5000
request body  [ { userText: 'is your name still Alex' } ]
api result on console :  Promise { <pending> }
responses[0].queryResult {
  fulfillmentMessages: [
    {
      platform: 'PLATFORM_UNSPECIFIED',
      text: [Object],
      message: 'text'
    }
  ],
  outputContexts: [],
  queryText: 'is your name still Alex',
  speechRecognitionConfidence: 0,
  action: 'name.agent.confirm',
  parameters: {
    fields: {
      'given-name': [Object],
      'nick-name': [Object],
      type: [Object],
      'last-name': [Object]
    }
  },
  allRequiredParamsPresent: true,
  fulfillmentText: 'name.agent.confirm ka response text me',
  webhookSource: '',
  webhookPayload: null,
  intent: {
    inputContextNames: [],
    events: [],
    trainingPhrases: [],
    outputContexts: [],
    parameters: [],
    messages: [],
    defaultResponsePlatforms: [],
    followupIntentInfo: [],
    name: 'projects/agent-name-1-wkryvn/agent/intents/d55553c4-9fb6-4c8d-9991-d9f33693a891',
    displayName: 'name.agent.confirm',
    priority: 0,
    isFallback: false,
    webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
    action: '',
    resetContexts: false,
    rootFollowupIntentName: '',
    parentFollowupIntentName: '',
    mlDisabled: false
  },
  intentDetectionConfidence: 1,
  diagnosticInfo: null,
  languageCode: 'en',
  sentimentAnalysisResult: null
}
data :  [
  {
    Query: 'is your name still Alex',
    Response: 'name.agent.confirm ka response text me',
    Intent: 'name.agent.confirm'
  }
]
